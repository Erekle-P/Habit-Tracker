"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/

Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')

Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')

Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from habits.views import (
    RegisterUserView,
    LoginView,
    HabitListCreateView,
    HabitDetailView,
    CustomLogoutView,
    ChatWithAIView  # ✅ Import AI Chat view
)

urlpatterns = [
    # 📌 Admin Panel
    path('admin/', admin.site.urls),

    # 📌 Authentication Endpoints
    path('api/signup/', RegisterUserView.as_view(), name='signup'),  # User registration
    path('api/login/', LoginView.as_view(), name='login'),  # Login with username/password
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # JWT refresh token
    path('api/logout/', CustomLogoutView.as_view(), name="logout"),  # Logout & token blacklist

    # 📌 Habit Tracking Endpoints
    path('api/habits/', HabitListCreateView.as_view(), name='habit-list'),  # List/Create habits
    path('api/habits/<int:pk>/', HabitDetailView.as_view(), name='habit-detail'),  # Retrieve/Update/Delete a habit

    # 📌 AI Chatbot Endpoint (New)
    path('api/chat/', ChatWithAIView.as_view(), name='chat_with_ai'),  # Interact with AI
]
