
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Category, Product } from "@/lib/types";
import { Pencil, Trash2, Image, Upload, X } from "lucide-react";

const Admin: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("products");
  
  // Simulated products
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Wedding Package Premium",
      description: "Complete wedding decoration including flowers and balloons",
      price: 45000,
      category: Category.WEDDING,
      images: ["/placeholder.svg"],
      featured: true
    },
    {
      id: "2",
      name: "Birthday Basic Setup",
      description: "Essential decoration for birthday parties",
      price: 8500,
      category: Category.BIRTHDAY,
      images: ["/placeholder.svg"],
      featured: false
    }
  ]);
  
  // Product Form State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    category: Category.WEDDING,
    images: [],
    featured: false
  });
  
  // Order Management (simplified)
  const [orders, setOrders] = useState([
    { 
      id: "1", 
      customer: "Anil Kumar", 
      services: "Wedding Package Premium", 
      date: "2023-12-15", 
      status: "Confirmed",
      total: 45000
    },
    { 
      id: "2", 
      customer: "Meena Sharma", 
      services: "Birthday Basic Setup", 
      date: "2023-12-20", 
      status: "Pending",
      total: 8500
    }
  ]);
  
  // Gallery management (simplified)
  const [galleryImages, setGalleryImages] = useState([
    { id: "1", image: "/placeholder.svg", title: "Wedding Setup", category: Category.WEDDING },
    { id: "2", image: "/placeholder.svg", title: "Birthday Party", category: Category.BIRTHDAY }
  ]);
  
  // If not authenticated or not admin, redirect to home
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }
  
  // Handle product form change
  const handleProductFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setProductForm({
      ...productForm,
      [name]: type === "number" ? parseFloat(value) : value
    });
  };
  
  // Handle product category change
  const handleCategoryChange = (value: string) => {
    setProductForm({
      ...productForm,
      category: value as Category
    });
  };
  
  // Toggle featured status
  const handleFeaturedToggle = () => {
    setProductForm({
      ...productForm,
      featured: !productForm.featured
    });
  };
  
  // Reset product form
  const resetProductForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: 0,
      category: Category.WEDDING,
      images: [],
      featured: false
    });
    setEditingProduct(null);
  };
  
  // Add new product
  const handleAddProduct = () => {
    setShowProductForm(true);
    resetProductForm();
  };
  
  // Edit product
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      images: product.images,
      featured: product.featured
    });
    setShowProductForm(true);
  };
  
  // Delete product
  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would be an API call
    setProducts(products.filter(product => product.id !== productId));
    toast.success("Product deleted successfully");
  };
  
  // Save product
  const handleSaveProduct = () => {
    // Basic validation
    if (!productForm.name || !productForm.description || !productForm.price) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real app, this would be an API call
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(product => 
        product.id === editingProduct.id 
          ? { ...product, ...productForm } 
          : product
      ));
      toast.success("Product updated successfully");
    } else {
      // Add new product
      const newProduct: Product = {
        id: `product-${Date.now()}`,
        name: productForm.name!,
        description: productForm.description!,
        price: productForm.price!,
        category: productForm.category || Category.OTHER,
        images: productForm.images || ["/placeholder.svg"],
        featured: productForm.featured || false
      };
      setProducts([...products, newProduct]);
      toast.success("Product added successfully");
    }
    
    setShowProductForm(false);
    resetProductForm();
  };
  
  // Simulated image upload
  const handleImageUpload = () => {
    // In a real app, this would handle file uploads
    toast.info("Image upload is not implemented in this demo");
    
    // For demonstration purposes, add a placeholder image
    setProductForm({
      ...productForm,
      images: [...(productForm.images || []), "/placeholder.svg"]
    });
  };
  
  // Remove image
  const handleRemoveImage = (index: number) => {
    setProductForm({
      ...productForm,
      images: (productForm.images || []).filter((_, i) => i !== index)
    });
  };
  
  return (
    <div className="min-h-screen bg-sage-50">
      <Navbar />
      
      {/* Admin Dashboard */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 bg-sage-50">
        <div className="container mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-2 animate-fade-in">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mb-8 animate-fade-in">
            Manage your products, orders, gallery images, and website content.
          </p>
          
          <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="products">Products & Services</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>
            
            {/* Products Tab */}
            <TabsContent value="products" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Products & Services</CardTitle>
                      <CardDescription>
                        Manage your decoration packages and services.
                      </CardDescription>
                    </div>
                    <Button onClick={handleAddProduct}>Add New Product</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price (₹)</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            {product.featured ? "Yes" : "No"}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Pencil className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {products.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                            No products found. Add your first product!
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Orders Tab */}
            <TabsContent value="orders" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>
                    View and manage customer bookings and orders.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Services</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total (₹)</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.services}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === "Confirmed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {order.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {orders.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No orders found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Gallery Tab */}
            <TabsContent value="gallery" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gallery Management</CardTitle>
                      <CardDescription>
                        Upload and manage images for your decoration portfolio.
                      </CardDescription>
                    </div>
                    <Button>Add New Image</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image) => (
                      <div 
                        key={image.id}
                        className="group relative rounded-lg overflow-hidden h-48 shadow-sm hover:shadow-md transition-all"
                      >
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${image.image})` }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="bg-white">
                              <Pencil className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="bg-white text-destructive">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                          <h3 className="text-white font-medium text-sm">{image.title}</h3>
                          <p className="text-white/80 text-xs">{image.category}</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add Image Placeholder */}
                    <div 
                      className="rounded-lg border-2 border-dashed border-gray-300 h-48 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors bg-white/50"
                      onClick={() => toast.info("Upload functionality is not implemented in this demo")}
                    >
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-gray-500 font-medium">Upload Image</p>
                      <p className="text-gray-400 text-sm">Click to browse files</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Product Form Dialog */}
      <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif font-bold">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              Fill in the product details below. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4 md:col-span-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name*</Label>
                <Input 
                  id="name"
                  name="name"
                  value={productForm.name || ""}
                  onChange={handleProductFormChange}
                  placeholder="Enter product name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={productForm.description || ""}
                  onChange={handleProductFormChange}
                  placeholder="Enter product description"
                  className="min-h-24"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)*</Label>
              <Input 
                id="price"
                name="price"
                type="number"
                value={productForm.price || ""}
                onChange={handleProductFormChange}
                placeholder="Enter price"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Select 
                value={productForm.category} 
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Category).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <Label>Product Images</Label>
              <div className="flex flex-wrap gap-4">
                {(productForm.images || []).map((image, index) => (
                  <div key={index} className="relative h-24 w-24 rounded-md overflow-hidden border">
                    <img 
                      src={image} 
                      alt={`Product ${index}`} 
                      className="h-full w-full object-cover" 
                    />
                    <button 
                      type="button"
                      className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/70 text-white flex items-center justify-center"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 transition-colors"
                  onClick={handleImageUpload}
                >
                  <Image className="h-6 w-6 mb-1" />
                  <span className="text-xs">Add Image</span>
                </button>
              </div>
            </div>
            
            <div className="md:col-span-2 flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={productForm.featured || false}
                onChange={handleFeaturedToggle}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Mark as featured product
              </Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowProductForm(false);
                resetProductForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProduct}>
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Admin;
