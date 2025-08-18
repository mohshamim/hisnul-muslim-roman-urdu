# Hisnul Muslim Admin Panel

A modern, responsive admin panel built with Next.js, Shadcn UI, and MongoDB for managing the Hisnul Muslim Islamic app content.

## 🚀 Features

- **Dashboard Overview**: Real-time statistics and recent activity
- **Categories Management**: Create, edit, and delete Islamic categories
- **Duas Management**: Add, edit, and delete prayers with bilingual support
- **Modern UI**: Clean, responsive design using Shadcn UI components
- **Real-time Updates**: Instant data refresh after operations
- **Bilingual Support**: English and Arabic content management

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Shadcn UI, Tailwind CSS
- **Database**: MongoDB Atlas
- **Icons**: Lucide React, Tabler Icons
- **State Management**: React Hooks
- **API**: Next.js API Routes

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account
- Git

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd admin-panel
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

The admin panel automatically creates the following collections in MongoDB:

- **categories**: Islamic categories with icons and descriptions
- **duas**: Prayers and supplications with bilingual content
- **users**: Admin user management (future feature)

## 📱 Usage

### Categories Management

- **Add Category**: Click "Add Category" button
- **Edit Category**: Click the "Edit" button on any category card
- **Delete Category**: Click the "Delete" button (with confirmation)

### Duas Management

- **Add Dua**: Click "Add Dua" button
- **Edit Dua**: Click the "Edit" button on any dua card
- **Delete Dua**: Click the "Delete" button (with confirmation)

### Features

- **Bilingual Support**: All content supports both English and Arabic
- **Category Association**: Duas can be associated with multiple categories
- **Bookmark Status**: Mark duas as bookmarked
- **Real-time Updates**: Data refreshes automatically after operations

## 🔧 API Endpoints

### Categories

- `GET /api/categories` - Fetch all categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category

### Duas

- `GET /api/duas` - Fetch all duas
- `POST /api/duas` - Create new dua
- `PUT /api/duas/[id]` - Update dua
- `DELETE /api/duas/[id]` - Delete dua

## 🎨 UI Components

The admin panel uses Shadcn UI components for a consistent and modern design:

- **Cards**: Display categories and duas
- **Modals**: Add/edit forms
- **Tabs**: Organized content sections
- **Buttons**: Action triggers
- **Badges**: Status indicators
- **Tables**: Data organization (future enhancement)

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables for Production

Update your production environment variables:

- `MONGODB_URI`: Production MongoDB connection string
- `NEXTAUTH_SECRET`: Strong secret key
- `NEXTAUTH_URL`: Production URL

## 🔒 Security Features

- Input validation on all forms
- MongoDB injection protection
- Error handling and logging
- Confirmation dialogs for destructive actions

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Verify your connection string in `.env.local`
   - Check network access to MongoDB Atlas
   - Ensure IP whitelist includes your development machine

2. **Build Errors**

   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run type-check`

3. **Component Not Rendering**
   - Check browser console for errors
   - Verify all required props are passed
   - Check component imports

### Development Tips

- Use browser dev tools to inspect API calls
- Check MongoDB Atlas logs for database issues
- Monitor Next.js development server logs

## 📈 Future Enhancements

- [ ] User authentication and authorization
- [ ] Bulk import/export functionality
- [ ] Advanced search and filtering
- [ ] Analytics dashboard
- [ ] Mobile-responsive optimizations
- [ ] Multi-language admin interface
- [ ] Backup and restore functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Hisnul Muslim app ecosystem.

## 🆘 Support

For support and questions:

- Check the troubleshooting section
- Review MongoDB Atlas documentation
- Check Next.js and Shadcn UI documentation

---

**Built with ❤️ for the Islamic community**
