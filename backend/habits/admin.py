# In habits/admin.py

from django.contrib import admin
from .models import Habit

class HabitAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'frequency')

    def custom_completed(self, obj):
        # Assuming 'completed' might be a computed value
        return obj.completed_status  # or any logic you need
    custom_completed.short_description = 'Completed'
    
admin.site.register(Habit, HabitAdmin)
