import random
from json import JSONEncoder

from mau_mau.card import Card


class Deck:
    player_cards = []
    opponent_cards = []
    deck = []

    @staticmethod
    def generate_mau_mau_deck() -> deck:
        already_generated = set()
        deck = Deck()

        deck.player_cards = Deck.generate_cards(4, already_generated)
        deck.opponent_cards = Deck.generate_cards(4, already_generated)
        deck.deck = Deck.generate_cards(24, already_generated)
        return deck

    @staticmethod
    def generate_cards(number_of_cards: int, already_generated: set) -> list:
        new_cards = []
        while len(new_cards) < number_of_cards and len(already_generated) < 32:
            card = Card(random.randint(0, 8) * 112, random.randint(0, 8) * 187)
            if card not in already_generated:
                new_cards.append(card)
                already_generated.add(card)

        return new_cards


class DeckEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__
