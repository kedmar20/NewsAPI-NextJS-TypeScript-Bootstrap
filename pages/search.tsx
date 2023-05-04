import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle } from "@/models/NewsArticles";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";

const SearchNewsPage = () => {
   const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null);
   const [searchResultsLoading, setSearchResultsLoading] = useState(false);
   const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState(false);

   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const searchQuery = formData.get("searchQuery")?.toString().trim();

      if (searchQuery) {
         try {
            setSearchResults(null); //Das heißt, wir führen eine neue Suche durch und die vorherigen werden entfernt
            setSearchResultsLoadingIsError(false);
            setSearchResultsLoading(true);
            const response = await fetch("/api/search-news?contain_one=" + searchQuery);
            const articles: NewsArticle[] = await response.json();
            // console.log(articles);
            setSearchResults(articles);
         } catch (error) {
            console.error(error);
            setSearchResultsLoadingIsError(true);
         } finally {
            setSearchResultsLoading(false);
         }
      }
   }

   return (
      <>
         <Head>
            <title key="title">Search News - NextJS News App</title>
         </Head>
         <main>
            <Form onSubmit={handleSubmit}>
               <Form.Group className="mb-3" controlId="search-input">
                  <Form.Label>Suche die Nachrichten</Form.Label>
                  <Form.Control name="searchQuery" placeholder="z.B. Mercedes, SpaceX, Steuern..." />
               </Form.Group>
               <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
                  Search
               </Button>
            </Form>
            <div className="d-flex flex-column align-items-center">
               {searchResultsLoading && <Spinner animation="border" /> /*Spinner is from Bootstrap*/}
               {searchResultsLoadingIsError && <p>Etwas ist schief gelaufen. Bitte versuche es erneut.</p>}
               {searchResults?.length === 0 && <p>Nichts gefunden. Versuchen Sie es mit einer anderen Abfrage!</p>}
               {searchResults && <NewsArticlesGrid articles={searchResults} />}
            </div>
         </main>
      </>
   );
};

export default SearchNewsPage;
