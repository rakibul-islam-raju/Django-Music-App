from music.models import Music
from django.shortcuts import render


def home_page(request):
    context = {
        'musics': Music.objects.all()
    }
    return render(request, 'home.html', context)
