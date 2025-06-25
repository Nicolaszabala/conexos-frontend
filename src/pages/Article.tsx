import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import NeuralNetworkLoader from "@/components/neural-network-loader";
import { useDrupalAPI } from "@/services/drupal-api";

export default function Article() {
  const [, setLocation] = useLocation();
  const { getImageUrl } = useDrupalAPI();
  const [article, setArticle] = useState<any>(null);
  const [included, setIncluded] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener el ID del artículo de la URL
  const articleId = window.location.pathname.split('/').pop();

  useEffect(() => {
    if (articleId) {
      fetch(`https://conexos.es/jsonapi/node/article/${articleId}?include=field_image`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Artículo no encontrado');
          }
          return response.json();
        })
        .then(data => {
          setArticle(data.data);
          setIncluded(data.included || []);
          setIsLoading(false);
        })
        .catch(err => {
          setError("No se pudo cargar el artículo.");
          setIsLoading(false);
        });
    }
  }, [articleId]);

  if (isLoading) {
    return <NeuralNetworkLoader />;
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Artículo no encontrado</h1>
          <button
            onClick={() => setLocation("/blog")}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </button>
        </div>
        <Footer />
      </div>
    );
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

  const imageUrl = getImageUrlFromArticle(article);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section with Image */}
      {imageUrl && (
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={imageUrl}
            alt={article.attributes.title}
            className="w-full h-full object-cover object-center"
            style={{
              imageRendering: 'crisp-edges',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
            loading="eager"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl drop-shadow-lg">
                  {article.attributes.title}
                </h1>
                <div className="flex items-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="drop-shadow-sm">{formatDate(article.attributes.created)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="drop-shadow-sm">5 min lectura</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Back button and share */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setLocation("/blog")}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al blog
              </button>
              <button className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="w-4 h-4" />
                Compartir
              </button>
            </div>

            {/* Article content */}
            <article className="prose prose-lg max-w-none">
              {article.attributes.body && article.attributes.body.value && (
                <div 
                  className="text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.attributes.body.value }} 
                />
              )}
            </article>

            {/* Article footer */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Última actualización: {formatDate(article.attributes.changed)}
                </div>
                <button
                  onClick={() => setLocation("/blog")}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al blog
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
} 