from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Habit
from .serializers import HabitSerializer
from .openai_utils import generate_ai_response  # ✅ Correct import name


# 📌 User Serializer
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# 📌 User Registration API
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# 📌 User Login API (JWT Token Generation)
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            })
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# 📌 Habit List & Create API (Authenticated Users Only)
class HabitListCreateView(generics.ListCreateAPIView):
    serializer_class = HabitSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# 📌 Habit Detail (Retrieve, Update, Delete) API (Authenticated Users Only)
class HabitDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = HabitSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)

# 📌 Custom Logout API (Blacklists Token)
class CustomLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the token to prevent reuse

            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Invalid token or logout failed."}, status=status.HTTP_400_BAD_REQUEST)

# 📌 AI Chat API (Authenticated Users Only)
class ChatWithAIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Takes a 'prompt' from the request body and returns an AI-generated response.
        """
        data = request.data
        prompt = data.get("prompt", "")

        if not prompt:
            return Response({"error": "No prompt provided"}, status=status.HTTP_400_BAD_REQUEST)

        response = generate_response(prompt)
        return Response({"response": response})
