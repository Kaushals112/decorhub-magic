
from rest_framework import serializers
from .models import GalleryImage

class GalleryImageSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = GalleryImage
        fields = ['id', 'title', 'image', 'category', 'category_name', 'description', 'featured', 'created_at']
