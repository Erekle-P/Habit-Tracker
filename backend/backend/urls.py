"""
URL configuration for backend project.
"""
from django.contrib import admin
from django.urls import path, re_path
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenRefreshView
from habits.views import (
    RegisterUserView,
    LoginView,
    CustomLogoutView,
    HabitListCreateView,
    HabitDetailView,
    TaskListCreateView,
    TaskDetailView,
    ChatWithAIView,
    SortAllView,  # Single endpoint to sort both habits & tasks
)


urlpatterns = [
    # Django Admin
    path("admin/", admin.site.urls),

    # Auth
    path("api/signup/", RegisterUserView.as_view(), name="signup"),
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/logout/", CustomLogoutView.as_view(), name="logout"),

    # Habits
    path("api/habits/", HabitListCreateView.as_view(), name="habit-list"),
    path("api/habits/<int:pk>/", HabitDetailView.as_view(), name="habit-detail"),

    # Tasks
    path("api/tasks/", TaskListCreateView.as_view(), name="task-list"),
    path("api/tasks/<int:pk>/", TaskDetailView.as_view(), name="task-detail"),

    # AI Chat & Sorting
    path("api/chat/", ChatWithAIView.as_view(), name="chat_with_ai"),
    path("api/ai-sort/", SortAllView.as_view(), name="sort_all"),
    
    re_path(r'^.*$', TemplateView.as_view(template_name="index.html")),
]
