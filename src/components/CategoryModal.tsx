"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";

interface CategoryModalProps {
  mode: "add" | "edit";
  category?: Category;
  onSave: (
    category: Omit<Category, "_id" | "createdAt" | "updatedAt">,
    isEdit: boolean,
    categoryId?: string
  ) => void;
  trigger?: React.ReactNode;
}

const iconOptions = [
  { value: "🕌", label: "Mosque" },
  { value: "☪️", label: "Islamic Symbol" },
  { value: "📿", label: "Prayer Beads" },
  { value: "🕯️", label: "Candle" },
  { value: "🌙", label: "Crescent Moon" },
  { value: "⭐", label: "Star" },
  { value: "💎", label: "Diamond" },
  { value: "🔮", label: "Crystal Ball" },
  { value: "🌺", label: "Flower" },
  { value: "🕊️", label: "Dove" },
];

export function CategoryModal({
  mode,
  category,
  onSave,
  trigger,
}: CategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: category?.name || "",
    nameArabic: category?.nameArabic || "",
    icon: category?.icon || "🕌",
    description: category?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, mode === 'edit', category?._id);
    setOpen(false);
    setFormData({
      name: "",
      nameArabic: "",
      icon: "🕌",
      description: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm">
            {mode === "add" ? (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Category
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Category" : "Edit Category"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Create a new category for organizing duas"
              : "Update the category information"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-right">
                Icon
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.icon}
                  onValueChange={(value) => handleChange("icon", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon.value} value={icon.value}>
                        <span className="flex items-center gap-2">
                          <span>{icon.value}</span>
                          <span>{icon.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name (English)
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="col-span-3"
                placeholder="e.g., Morning Prayers"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nameArabic" className="text-right">
                Name (Arabic)
              </Label>
              <Input
                id="nameArabic"
                value={formData.nameArabic}
                onChange={(e) => handleChange("nameArabic", e.target.value)}
                className="col-span-3"
                placeholder="e.g., أدعية الصباح"
                required
                dir="rtl"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="col-span-3"
                placeholder="Optional description for the category"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {mode === "add" ? "Create Category" : "Update Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
