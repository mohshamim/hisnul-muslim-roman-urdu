'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit } from 'lucide-react';
import { Dua, Category } from '@/types';

interface DuaModalProps {
  mode: 'add' | 'edit';
  dua?: Dua;
  categories: Category[];
  onSave: (dua: Omit<Dua, '_id' | 'createdAt' | 'updatedAt'>, isEdit: boolean, duaId?: string) => void;
  trigger?: React.ReactNode;
}

export function DuaModal({ mode, dua, categories, onSave, trigger }: DuaModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: dua?.title || '',
    titleArabic: dua?.titleArabic || '',
    content: dua?.content || '',
    contentArabic: dua?.contentArabic || '',
    reference: dua?.reference || '',
    referenceArabic: dua?.referenceArabic || '',
    categories: dua?.categories || [],
    isBookmarked: dua?.isBookmarked || false
  });

  useEffect(() => {
    if (dua) {
      setFormData({
        title: dua.title,
        titleArabic: dua.titleArabic,
        content: dua.content,
        contentArabic: dua.contentArabic,
        reference: dua.reference,
        referenceArabic: dua.referenceArabic,
        categories: dua.categories,
        isBookmarked: dua.isBookmarked || false
      });
    }
  }, [dua]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, mode === 'edit', dua?._id);
    setOpen(false);
    setFormData({
      title: '',
      titleArabic: '',
      content: '',
      contentArabic: '',
      reference: '',
      referenceArabic: '',
      categories: [],
      isBookmarked: false
    });
  };

  const handleChange = (field: string, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    const currentCategories = formData.categories;
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    
    handleChange('categories', newCategories);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm">
            {mode === 'add' ? (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Dua
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add New Dua' : 'Edit Dua'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Create a new dua with both English and Arabic content'
              : 'Update the dua information'
            }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Title Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title (English)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g., Morning Dua"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="titleArabic">Title (Arabic)</Label>
                <Input
                  id="titleArabic"
                  value={formData.titleArabic}
                  onChange={(e) => handleChange('titleArabic', e.target.value)}
                  placeholder="e.g., دعاء الصباح"
                  required
                  dir="rtl"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="content">Content (English)</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  placeholder="Enter the dua content in English"
                  required
                  rows={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contentArabic">Content (Arabic)</Label>
                <Textarea
                  id="contentArabic"
                  value={formData.contentArabic}
                  onChange={(e) => handleChange('contentArabic', e.target.value)}
                  placeholder="أدخل محتوى الدعاء باللغة العربية"
                  required
                  rows={6}
                  dir="rtl"
                />
              </div>
            </div>

            {/* Reference Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reference">Reference (English)</Label>
                <Input
                  id="reference"
                  value={formData.reference}
                  onChange={(e) => handleChange('reference', e.target.value)}
                  placeholder="e.g., Sahih Bukhari"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referenceArabic">Reference (Arabic)</Label>
                <Input
                  id="referenceArabic"
                  value={formData.referenceArabic}
                  onChange={(e) => handleChange('referenceArabic', e.target.value)}
                  placeholder="e.g., صحيح البخاري"
                  required
                  dir="rtl"
                />
              </div>
            </div>

            {/* Categories Section */}
            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-md p-3">
                {categories.map((category) => (
                  <div key={category._id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category._id}`}
                      checked={formData.categories.includes(category._id || '')}
                      onCheckedChange={() => handleCategoryToggle(category._id || '')}
                    />
                    <Label htmlFor={`category-${category._id}`} className="text-sm">
                      {category.name} / {category.nameArabic}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Bookmark Section */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isBookmarked"
                checked={formData.isBookmarked}
                onCheckedChange={(checked) => handleChange('isBookmarked', checked as boolean)}
              />
              <Label htmlFor="isBookmarked">Mark as Bookmarked</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Create Dua' : 'Update Dua'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
