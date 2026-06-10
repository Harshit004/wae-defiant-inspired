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
      const { id: inputId, name, categoryName, heroSubtitle, images, featuresList, specifications, status, description, heroImage, heroTagline, heroSubtext, heroCtaText, heroCtaLink, showcaseCtaText, showcaseCtaLink, brochurePdf, datasheetPdf, variants } = productData;
      
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
        categoryName: categoryName || parentCategory.title,
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
        status: status || 'Live',
        description: description || '',
        heroImage: heroImage || '',
        heroTagline: heroTagline || '',
        heroSubtext: heroSubtext || '',
        heroCtaText: heroCtaText || '',
        heroCtaLink: heroCtaLink || '',
        showcaseCtaText: showcaseCtaText || '',
        showcaseCtaLink: showcaseCtaLink || '',
        brochurePdf: brochurePdf || '',
        datasheetPdf: datasheetPdf || '',
        variants: variants || { hot: true, cold: true, ambient: true }
      };

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

      const { name, categoryName, heroSubtitle, images, featuresList, specifications, status, description, heroImage, heroTagline, heroSubtext, heroCtaText, heroCtaLink, showcaseCtaText, showcaseCtaLink, brochurePdf, datasheetPdf, variants } = productData;
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
        categoryName: categoryName !== undefined ? categoryName : (existing.categoryName || parentCategory.title),
        heroSubtitle: heroSubtitle !== undefined ? heroSubtitle : existing.heroSubtitle,
        images: images || existing.images,
        featuresList: featuresList || existing.featuresList,
        specifications: specifications || existing.specifications,
        status: status || existing.status || 'Live',
        description: description !== undefined ? description : existing.description,
        heroImage: heroImage !== undefined ? heroImage : existing.heroImage,
        heroTagline: heroTagline !== undefined ? heroTagline : existing.heroTagline,
        heroSubtext: heroSubtext !== undefined ? heroSubtext : existing.heroSubtext,
        heroCtaText: heroCtaText !== undefined ? heroCtaText : existing.heroCtaText,
        heroCtaLink: heroCtaLink !== undefined ? heroCtaLink : existing.heroCtaLink,
        showcaseCtaText: showcaseCtaText !== undefined ? showcaseCtaText : existing.showcaseCtaText,
        showcaseCtaLink: showcaseCtaLink !== undefined ? showcaseCtaLink : existing.showcaseCtaLink,
        brochurePdf: brochurePdf !== undefined ? brochurePdf : existing.brochurePdf,
        datasheetPdf: datasheetPdf !== undefined ? datasheetPdf : existing.datasheetPdf,
        variants: variants || existing.variants || { hot: true, cold: true, ambient: true }
      };

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
  } catch (error: any) {
    console.error('Error in Product API:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal server error.' }, { status: 500 });
  }
}
