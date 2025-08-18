"use client";

import { CategoryModal } from "@/components/CategoryModal";
import { DuaModal } from "@/components/DuaModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Dua } from "@/types";
import {
  BookOpen,
  Clock,
  Edit,
  FolderOpen,
  Plus,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [duas, setDuas] = useState<Dua[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<
    Category | undefined
  >();
  const [editingDua, setEditingDua] = useState<Dua | undefined>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, duasRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/duas"),
      ]);

      const categoriesData = await categoriesRes.json();
      const duasData = await duasRes.json();

      if (categoriesData.success) setCategories(categoriesData.data || []);
      if (duasData.success) setDuas(duasData.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategory = async (
    categoryData: Omit<Category, "_id" | "createdAt" | "updatedAt">,
    isEdit = false,
    categoryId?: string
  ) => {
    try {
      const url = isEdit ? `/api/categories/${categoryId}` : "/api/categories";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        await fetchData(); // Refresh data
        setEditingCategory(undefined);
      } else {
        console.error("Failed to save category");
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleSaveDua = async (
    duaData: Omit<Dua, "_id" | "createdAt" | "updatedAt">,
    isEdit = false,
    duaId?: string
  ) => {
    try {
      const url = isEdit ? `/api/duas/${duaId}` : "/api/duas";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(duaData),
      });

      if (response.ok) {
        await fetchData(); // Refresh data
        setEditingDua(undefined);
      } else {
        console.error("Failed to save dua");
      }
    } catch (error) {
      console.error("Error saving dua:", error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchData(); // Refresh data
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleDeleteDua = async (duaId: string) => {
    if (!confirm("Are you sure you want to delete this dua?")) return;

    try {
      const response = await fetch(`/api/duas/${duaId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchData(); // Refresh data
      } else {
        console.error("Failed to delete dua");
      }
    } catch (error) {
      console.error("Error deleting dua:", error);
    }
  };

  const stats = [
    {
      title: "Total Categories",
      value: categories.length,
      icon: FolderOpen,
      description: "Islamic categories",
      color: "text-blue-600",
    },
    {
      title: "Total Duas",
      value: duas.length,
      icon: BookOpen,
      description: "Prayers & supplications",
      color: "text-green-600",
    },
    {
      title: "Recent Additions",
      value: duas.filter((d) => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(d.createdAt) > weekAgo;
      }).length,
      icon: TrendingUp,
      description: "Last 7 days",
      color: "text-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Hisnul Muslim Admin
            </h1>
            <p className="text-gray-600">Manage your Islamic app content</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Admin Panel
            </Badge>
            <Button size="sm">
              <Users className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="duas">Duas</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest changes and additions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {duas.slice(0, 5).map((dua, index) => (
                    <div
                      key={dua._id || index}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {dua.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {dua.titleArabic}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {new Date(dua.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Categories Management
              </h2>
              <CategoryModal
                mode="add"
                onSave={handleSaveCategory}
                trigger={
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Card
                  key={category._id || index}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">{category.icon}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {category.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {category.nameArabic}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      {category.description || "No description available"}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {
                          duas.filter((d) =>
                            d.categories.includes(category._id || "")
                          ).length
                        }{" "}
                        duas
                      </Badge>
                      <div className="flex space-x-2">
                        <CategoryModal
                          mode="edit"
                          category={category}
                          onSave={handleSaveCategory}
                          trigger={
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          }
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleDeleteCategory(category._id || "")
                          }
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="duas" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Duas Management
              </h2>
              <DuaModal
                mode="add"
                categories={categories}
                onSave={handleSaveDua}
                trigger={
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Dua
                  </Button>
                }
              />
            </div>

            <div className="space-y-4">
              {duas.map((dua, index) => (
                <Card
                  key={dua._id || index}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{dua.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {dua.titleArabic}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={dua.isBookmarked ? "default" : "secondary"}
                      >
                        {dua.isBookmarked ? "Bookmarked" : "Not Bookmarked"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          English Content:
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {dua.content}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Arabic Content:
                        </p>
                        <p
                          className="text-sm text-gray-600 line-clamp-3"
                          dir="rtl"
                        >
                          {dua.contentArabic}
                        </p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          Reference:
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {dua.reference}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <DuaModal
                          mode="edit"
                          dua={dua}
                          categories={categories}
                          onSave={handleSaveDua}
                          trigger={
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          }
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteDua(dua._id || "")}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure your admin panel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Database Connection</p>
                      <p className="text-sm text-gray-500">MongoDB Atlas</p>
                    </div>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      Connected
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">API Status</p>
                      <p className="text-sm text-gray-500">
                        All endpoints active
                      </p>
                    </div>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
