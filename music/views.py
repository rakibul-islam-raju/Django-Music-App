from music.models import Music
from django.shortcuts import render


def home_page(request):
    musics =  Music.objects.all()
    context = {
        'musics': musics,
        'music_list': list(musics.values())
    }
    return render(request, 'home.html', context)
