import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import NeuralNetworkLoader from "@/components/neural-network-loader";
import { useDrupalAPI } from "@/services/drupal-api";

export default function Blog() {
  const [, setLocation] = useLocation();
  const { getArticles, getImageUrl } = useDrupalAPI();
  const [articles, setArticles] = useState<any[]>([]);
  const [included, setIncluded] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getArticles()
      .then((result) => {
        setArticles(result.data);
        setIncluded(result.included || []);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("No se pudieron cargar los artículos. Verifica la conexión con Drupal.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <NeuralNetworkLoader />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageUrlFromArticle = (article: any) => {
    if (article.relationships?.field_image?.data) {
      const fileId = article.relationships.field_image.data.id;
      
      // Buscar el archivo en la estructura included
      const imageFile = included.find((item: any) => 
        item.type === 'file--file' && item.id === fileId
      );
      
      if (imageFile && imageFile.attributes?.uri?.value) {
        // Construir la URL correcta desde la URI del archivo
        const imageUrl = `https://conexos.es${imageFile.attributes.uri.value.replace('public://', '/sites/default/files/')}`;
        console.log('Image URL from included:', imageUrl);
        return imageUrl;
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre las últimas tendencias en tecnología, marketing digital y transformación empresarial
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-red-500 mb-8 p-4 bg-red-500/10 rounded-lg"
            >
              {error}
            </motion.div>
          )}
          
          {articles.length === 0 && !error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <Calendar className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">No hay artículos disponibles</h3>
              <p className="text-muted-foreground">Pronto publicaremos contenido interesante</p>
            </motion.div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => {
                const imageUrl = getImageUrlFromArticle(article);
                const hasImage = imageUrl !== null;
                
                return (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border/50 hover:border-border cursor-pointer"
                    onClick={() => setLocation(`/article/${article.id}`)}
                  >
                    {/* Image */}
                    {hasImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={article.attributes.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="p-6">
                      {/* Meta info */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.attributes.created)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>5 min lectura</span>
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.attributes.title}
                      </h2>
                      
                      {/* Excerpt */}
                      <div className="mb-4">
                        {article.attributes.body && (
                          article.attributes.body.summary ? (
                            <p className="text-muted-foreground line-clamp-3">
                              {article.attributes.body.summary}
                            </p>
                          ) : article.attributes.body.value ? (
                            <div 
                              className="text-muted-foreground line-clamp-3 prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ 
                                __html: article.attributes.body.value.replace(/<[^>]*>/g, '').substring(0, 150) + '...' 
                              }} 
                            />
                          ) : null
                        )}
                      </div>
                      
                      {/* Read more button */}
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        Leer más
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
} 