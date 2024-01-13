import { React, useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { listDecks } from "../utils/api/index.js";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "../Home/CreateDeck";
import DecksList from "../Home/DecksList";
import Study from "../Study/Study.js";
import DeckView from "../Decks/DeckView.js";
import EditDeck from "../Decks/EditDeck.js";
import AddCard from "../Cards/AddCards.js";
import EditCard from "../Cards/EditCard.js";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const fetchedDecks = await listDecks(abortController.signal);
        // console.log("Fetched Decks: " + JSON.stringify(fetchedDecks, null, 2));
        setDecks(fetchedDecks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/new">
            <CreateDeck decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study decks={decks} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard decks={decks} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard decks={decks} />
          </Route>
          <Route path="/decks/:deckId">
            <DeckView decks={decks} setDecks={setDecks} />
          </Route>
          <Route exact path="/">
            <Link to="/decks/new" className="btn btn-secondary">
              <i className="bi bi-plus-lg"></i> Create Deck
            </Link>
            <DecksList decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
