
from rest_framework import viewsets, permissions
from .models import GalleryImage
from .serializers import GalleryImageSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured = GalleryImage.objects.filter(featured=True)
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)
        
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        category_id = request.query_params.get('category_id')
        if category_id:
            images = GalleryImage.objects.filter(category_id=category_id)
            serializer = self.get_serializer(images, many=True)
            return Response(serializer.data)
        return Response({"error": "Category ID is required"}, status=400)
