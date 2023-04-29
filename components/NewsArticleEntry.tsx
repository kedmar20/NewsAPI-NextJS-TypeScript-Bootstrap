import { NewsArticle } from "@/models/NewsArticles";
import Image from "next/image";
import { Card } from "react-bootstrap";
// import placeholderImage from "@/assets/images/newsarticle_placeholder.jpg";
import styles from "@/styles/NewsArticleEntry.module.css";

interface NewsArticleEntryProps {
   article: NewsArticle;
}

const NewsArticleEntry = ({ article: { title, summary, url, image_url } }: NewsArticleEntryProps) => {
   const validImageUrl = image_url?.startsWith("http://") || image_url?.startsWith("https://") ? image_url : "";

   return (
      <a href={url}>
         <Card className="h-100">
            <Image src={validImageUrl} width={500} height={200} alt="News article image" className={`card-img-top ${styles.image}`} />
            <Card.Body>
               <Card.Title>{title}</Card.Title>
               <Card.Text>{summary}</Card.Text>
            </Card.Body>
         </Card>
      </a>
   );
};

export default NewsArticleEntry;

//    src={validImageUrl || placeholderImage}
