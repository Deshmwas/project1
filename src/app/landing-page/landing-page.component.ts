import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingPageService } from './../Services/landing-page.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from './product';
import { Router } from '@angular/router';




@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [LandingPageService]
})
export class LandingPageComponent {
 pagedProducts: Product[] | undefined;
  page = 1; // current page number
  pageSize = 20; // items per page
  totalPages: number | undefined;
  currentPage: any;
  location: any;
  productService: any;
   query: string = '';
goBack(): void {
  this.location.back();
}

 previousPage() {
    this.currentPage--;
    this.loadProducts();
  }
 loadProducts(): void {
  this.landingPageService.getAllProducts().subscribe((products: any[]) => {
    this.products = products;
  });
}


  nextPage() {
    this.currentPage++;
    this.loadProducts();
  }

  get paginatedProducts() {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.products.slice(startIndex, startIndex + this.pageSize);
  }

  addProductModal: any;
  editProductModal: any;
  products: any[] = [];
  image: string = 'https://via.placeholder.com/150x150.png?text=Image+not+found';
  imageSrc: any;
  addProductForm!: FormGroup;
  editProductForm!: FormGroup;
  selectedProduct: any;
  imageData: any;
  userEmail: string | null | undefined;

  constructor(
    private fb: FormBuilder, 
    public landingPageService: LandingPageService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail');
    this.getAllProducts(); 
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['',Validators.required],
      price: ['', Validators.required],
      // imageData: [''],
      userEmail: ['', Validators.required]
    });
    this.userEmail = localStorage.getItem('userEmail');
    this.editProductForm = this.fb.group({
      id: [ '', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['',Validators.required],
      price: ['', Validators.required],
      imageData: [''],
      // userEmail: ['', Validators.required]
    });
  }
   logout() {
    this.router.navigate(['/sign-in']);
  }

  

  getAllProducts() {
    this.landingPageService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data.map(product => ({
          ...product,
          image: product['imageUrl'],
          isLoading: false
        }));

        this.loadImagesForProducts();
      },
      (error: any) => {
        console.log(`Error fetching products: ${error}`);
      }
    );
  }

  loadImagesForProducts() {
    this.userEmail = localStorage.getItem('userEmail');
    for (let product of this.products) {
      if (product.image) {
        product.isLoading = true;
        this.landingPageService.getImage(product.imageUrl).subscribe(
          (image: Blob) => {
            this.createImageFromBlob(image, product);
          },
          (error: any) => {
            console.log(`Error fetching image for product with ID ${product.id}: ${error}`);
            product.isLoading = false;
          }
        );
      }
    }      
  }

  showAddProductModal() {
    this.addProductForm.reset();
    this.addProductModal = true;
     setTimeout(() => document.getElementById('productName')?.focus(), 0);
  }

 addNewProduct() {
  let formValues = this.addProductForm;
  formValues.value.imageData = this.imageData;
  formValues.value.userEmail=this.userEmail

  this.landingPageService.addProduct(formValues.value).subscribe(
    (addedProduct: Product) => {
      // Add the newly created product to the products array
      this.products.push({
        ...addedProduct,
        imageUrl: addedProduct['imageUrl'],
        isLoading: true
      });

      // Reload all products from the server
      this.getAllProducts();
    },
    (error: any) => {
      console.error('Error adding product:', error);
      // Remove product from frontend
      this.products.shift();
    }
  );

  this.addProductModal = false;
}

  

  showEditProductModal(product: any) {
    this.userEmail = localStorage.getItem('userEmail');
    this.editProductForm.reset();
    this.editProductForm.patchValue(product);
    this.selectedProduct = product;
    this.editProductModal = true;
  }
  

updateProduct() {
  this.userEmail = localStorage.getItem('userEmail');
  // Get the updated form values
  const formValues = this.editProductForm.value;
  formValues.imageData = this.imageData;

  // Call the landing page service to update the product
  this.landingPageService.updateProduct(formValues).subscribe(
    (updatedProduct: Product) => {
      const productIndex = this.products.findIndex(product => product.id === updatedProduct.id);
      if (productIndex !== -1) {
        this.products[productIndex] = {
          ...updatedProduct,
          imageUrl: updatedProduct['imageUrl'],
          isLoading: true,
        };
       
      }
      this.getAllProducts();
      location.reload(); // Reload the page after updating the product
      alert('Product updated successfully.'); // Show success message
    },
    (error: any) => {
      console.log(`Error updating product: ${error}`);
    }
  );
}


  
deleteProduct(id: any): void {
  
  this.landingPageService.deleteProduct(id).subscribe(
  (response) => {
    console.log('Success:', response);
    this.products = this.products.filter(product => product.id !== id);
    this.showSuccessMessage(response.message);
  },
  (error) => {
    console.error('Error:', error);
    let errorMessage = 'Failed to delete product.';
    if (error.status === 404) {
      errorMessage = `Product ${id} not found.`;
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    this.showErrorMessage(errorMessage);
  }
);

}

  showSuccessMessage(arg0: string) {
    console.log('Success:', onmessage);
    
  }
  showErrorMessage(arg0: string) {
     console.error('Error:', onmessage);
  
  }
confirmDeleteProduct(productId: number) {
  if (window.confirm('Are you sure you want to delete this product?')) {
    this.deleteProduct(productId);
  }
}


  createImageFromBlob(image: Blob, product: any) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      product.imageUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
      product.isLoading = false;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onFileSelected(event: any) {
    this.imageData = event.target.files[0];
  }
   
}