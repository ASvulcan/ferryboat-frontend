import { Link } from "wouter";
import { motion } from "framer-motion";
import { Ship, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function NotFound() {
  return (
    <PageWrapper className="bg-background">
      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen pt-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 mx-auto mb-8">
            <Ship className="w-12 h-12 text-primary" />
          </div>
          <h1 className="font-serif text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            This route doesn't exist on our map.
          </p>
          <Link href="/">
            <Button className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </PageWrapper>
  );
}