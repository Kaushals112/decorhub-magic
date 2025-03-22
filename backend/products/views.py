
from rest_framework import viewsets, permissions
from .models import Category, Product, ProductImage
from .serializers import CategorySerializer, ProductSerializer, ProductImageSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]
    
    @action(detail=True, methods=['post'], parser_classes=[MultiPartParser, FormParser])
    def upload_images(self, request, pk=None):
        product = self.get_object()
        images = request.FILES.getlist('images')
        is_primary = request.data.get('is_primary', False)
        
        # If is_primary is true, set all other images to not primary
        if is_primary:
            ProductImage.objects.filter(product=product, is_primary=True).update(is_primary=False)
        
        serializer = ProductImageSerializer(data=[{
            'product': product.id,
            'image': image,
            'is_primary': is_primary if index == 0 else False
        } for index, image in enumerate(images)], many=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_products = Product.objects.filter(featured=True)
        serializer = self.get_serializer(featured_products, many=True)
        return Response(serializer.data)
