import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { ProductDetails, Product } from '@/data/products';

export async function GET() {
  try {
    const { products, categories } = readDB();
    return NextResponse.json({
      success: true,
      products: Object.values(products),
      categories: Object.values(categories),
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to read products.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id, productData, categoryId, subCategory } = body;
    const dbState = readDB();

    if (action === 'create') {
      const { id: inputId, name, heroSubtitle, images, featuresList, specifications, status } = productData;
      
      const generatedId = inputId
        ? inputId.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      if (dbState.products[generatedId]) {
        return NextResponse.json(
          { success: false, message: `Product with ID/slug "${generatedId}" already exists.` },
          { status: 400 }
        );
      }

      const parentCategory = dbState.categories[categoryId];
      if (!parentCategory) {
        return NextResponse.json(
          { success: false, message: `Parent category "${categoryId}" not found.` },
          { status: 400 }
        );
      }

      // Add to PRODUCTS
      const newProductDetails: ProductDetails = {
        id: generatedId,
        name,
        categoryName: parentCategory.title,
        heroSubtitle: heroSubtitle || '',
        images: images || [],
        featuresList: featuresList || [],
        specifications: specifications || {
          storageCapacity: [],
          waterTemp: { cold: '', hot: '' },
          greenCertification: '',
          dripTray: '',
          refrigerant: '',
          dimensions: [],
          powerRequirement: '',
          purificationSystem: '',
          pointOfUseSterilization: ''
        },
        status: status || 'Live'
      } as any; // Cast in case interface isn't updated yet

      dbState.products[generatedId] = newProductDetails;

      // Add to parent category's product list
      const categoryProduct: Product = {
        id: generatedId,
        name,
        category: subCategory || 'free-standing',
        image: images && images[0] ? images[0] : ''
      };
      parentCategory.products.push(categoryProduct);

      await writeDB(dbState);
      return NextResponse.json({ success: true, product: newProductDetails });
    }

    if (action === 'update') {
      if (!id || !dbState.products[id]) {
        return NextResponse.json({ success: false, message: 'Product not found.' }, { status: 404 });
      }

      const { name, heroSubtitle, images, featuresList, specifications, status } = productData;
      const existing = dbState.products[id];

      const parentCategory = dbState.categories[categoryId];
      if (!parentCategory) {
        return NextResponse.json(
          { success: false, message: `Parent category "${categoryId}" not found.` },
          { status: 400 }
        );
      }

      // Update PRODUCTS
      dbState.products[id] = {
        ...existing,
        name: name || existing.name,
        categoryName: parentCategory.title,
        heroSubtitle: heroSubtitle !== undefined ? heroSubtitle : existing.heroSubtitle,
        images: images || existing.images,
        featuresList: featuresList || existing.featuresList,
        specifications: specifications || existing.specifications,
        status: status || existing.status || 'Live'
      } as any;

      // Update/Move category placement
      // Find where the product currently is and remove it
      Object.keys(dbState.categories).forEach((catKey) => {
        dbState.categories[catKey].products = dbState.categories[catKey].products.filter(
          (p) => p.id !== id
        );
      });

      // Add it to the target category
      const categoryProduct: Product = {
        id,
        name: name || existing.name,
        category: subCategory || 'free-standing',
        image: images && images[0] ? images[0] : (existing.images && existing.images[0] ? existing.images[0] : '')
      };
      parentCategory.products.push(categoryProduct);

      await writeDB(dbState);
      return NextResponse.json({ success: true, product: dbState.products[id] });
    }

    if (action === 'delete') {
      if (!id || !dbState.products[id]) {
        return NextResponse.json({ success: false, message: 'Product not found.' }, { status: 404 });
      }

      // Remove from PRODUCTS
      delete dbState.products[id];

      // Remove from CATEGORIES product lists
      Object.keys(dbState.categories).forEach((catKey) => {
        dbState.categories[catKey].products = dbState.categories[catKey].products.filter(
          (p) => p.id !== id
        );
      });

      await writeDB(dbState);
      return NextResponse.json({ success: true, message: 'Product deleted successfully.' });
    }

    return NextResponse.json({ success: false, message: 'Invalid action.' }, { status: 400 });
  } catch (error) {
    console.error('Error in Product API:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
