from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Creating a note


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
# You canno't call this rout unless
# you're authenticated and you pass a valid JWT

    def get_queryset(self):
        user = self.request.user
        # get the user that is authenticated and interacting with this route
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


# Deleting a note


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    # valid notes that you could delete

    def get_queryset(self):
        user = self.request.user
        # get the user that is authenticated and interacting with this route
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    # list of all the differente objects that
    # we're gona be looking at when we're creating a new one to make sure
    # that we don't create a user that already exist
    serializer_class = UserSerializer
    # what kinda of data we need to accept to make a new user
    permission_classes = [AllowAny]
    # who can actually can this