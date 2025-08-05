"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/product.types";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";

interface OrderModalProps {
  product: Product;
  children: React.ReactNode;
}

interface OrderFormData {
  quantity: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const OrderModal = ({ product, children }: OrderModalProps) => {
  const t = useTranslation();
  const { colorSelection, sizeSelection } = useAppSelector(
    (state: RootState) => state.products
  );
  
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    quantity: 1,
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
  };

  const calculateTotal = () => {
    const discountedPrice = product.discount.percentage > 0 
      ? Math.round(product.price - (product.price * product.discount.percentage) / 100)
      : product.discount.amount > 0 
        ? product.price - product.discount.amount 
        : product.price;
    
    return discountedPrice * formData.quantity;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare order data
    const orderData = {
      product: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.srcUrl
      },
      selectedColor: colorSelection,
      selectedSize: sizeSelection,
      quantity: formData.quantity,
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      },
      total: calculateTotal(),
      orderDate: new Date().toISOString()
    };

    try {
      // Here you would typically send the order to your backend
      console.log('Order submitted:', orderData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(t?.order?.success || 'Order submitted successfully!');
      setOpen(false);
      
      // Reset form
      setFormData({
        quantity: 1,
        fullName: '',
        email: '',
        phone: '',
        address: ''
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert(t?.order?.error || 'Error submitting order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:max-w-[700px] lg:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {t?.order?.title || "Order Now"}
          </DialogTitle>
        </DialogHeader>
        
        {/* Product Summary */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center space-x-4">
            <img 
              src={product.srcUrl} 
              alt={product.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium">{product.title}</h4>
              {colorSelection && (
                <p className="text-sm text-gray-600">
                  {t?.order?.color || "Color"}: {colorSelection.name}
                </p>
              )}
              {sizeSelection && (
                <p className="text-sm text-gray-600">
                  {t?.order?.size || "Size"}: {sizeSelection}
                </p>
              )}
              <p className="font-bold text-lg">${calculateTotal()}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Row: Quantity and Full Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">{t?.order?.quantity || "Quantity"}</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                max="10"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="fullName">{t?.order?.fullName || "Full Name"}</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Second Row: Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">{t?.order?.email || "Email"}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">{t?.order?.phone || "Phone Number"}</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Third Row: Address (Full Width) */}
          <div>
            <Label htmlFor="address">{t?.order?.address || "Address"}</Label>
            <Textarea
              id="address"
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              {t?.order?.cancel || "Cancel"}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-black text-white hover:bg-black/80"
            >
              {isSubmitting 
                ? (t?.order?.submitting || "Submitting...") 
                : (t?.order?.submit || "Submit Order")
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
