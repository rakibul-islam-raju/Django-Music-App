from music.models import Music
from django.shortcuts import render


def home_page(request):
    musics = Music.objects.all()
    fields = ['id', 'title', 'album__name', 'artist',
              'audio_file', 'cover_image', 'time_length']
    context = {
        'musics': musics,
        'music_list': list(musics.values(*fields))
    }
    return render(request, 'home.html', context)
