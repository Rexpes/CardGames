import json

from django.http import HttpResponse
from django.template import loader

from mau_mau.deck import Deck, DeckEncoder


def mau_mau(request):
    deck = Deck.generate_mau_mau_deck()
    template = loader.get_template("mau_mau.html")
    context = {
        'playerCards': deck.player_cards,
        'opponentCards': deck.opponent_cards,
        'deck': deck.deck
    }
    html = HttpResponse(template.render(context, request))
    html.set_cookie('deck', json.dumps(deck.__dict__, cls=DeckEncoder, ensure_ascii=True), max_age=None, samesite="Lax")
    return html


def index(request):
    template = loader.get_template("index.html")
    context = {}
    return HttpResponse(template.render(context, request))
