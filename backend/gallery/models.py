
from django.db import models
from core.models import BaseModel
from products.models import Category

class GalleryImage(BaseModel):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery/')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, related_name='gallery_images', null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
