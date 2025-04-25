"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollReveal, TypewriterText, StaggeredReveal } from '@/components/animations';

export default function AnimationTestPage() {
  return (
    <div className="container py-12 space-y-12">
      <h1 className="text-4xl font-bold mb-8">Animation Test Page</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Button Animations</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="glow">Glow Button</Button>
          <Button glow="medium">Medium Glow</Button>
          <Button glow="pulse">Pulse Glow</Button>
          <Button variant="payment">Payment Button</Button>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Card Animations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card animation="fadeIn" className="max-w-sm">
            <CardHeader>
              <CardTitle>Fade In Card</CardTitle>
            </CardHeader>
            <CardContent>This card should fade in on load</CardContent>
          </Card>
          
          <Card animation="slideUp" className="max-w-sm">
            <CardHeader>
              <CardTitle>Slide Up Card</CardTitle>
            </CardHeader>
            <CardContent>This card should slide up on load</CardContent>
          </Card>
          
          <Card hover="lift" className="max-w-sm">
            <CardHeader>
              <CardTitle>Hover Lift Card</CardTitle>
            </CardHeader>
            <CardContent>This card should lift on hover</CardContent>
          </Card>
          
          <Card variant="glow" className="max-w-sm">
            <CardHeader>
              <CardTitle>Glow Card</CardTitle>
            </CardHeader>
            <CardContent>This card should glow on hover</CardContent>
          </Card>
          
          <Card hover="scale" className="max-w-sm">
            <CardHeader>
              <CardTitle>Scale Card</CardTitle>
            </CardHeader>
            <CardContent>This card should scale on hover</CardContent>
          </Card>
          
          <Card animation="zoomIn" className="max-w-sm">
            <CardHeader>
              <CardTitle>Zoom In Card</CardTitle>
            </CardHeader>
            <CardContent>This card should zoom in on load</CardContent>
          </Card>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Scroll Reveal Animations</h2>
        <div className="space-y-4">
          <div className="reveal-on-scroll p-6 bg-muted rounded-lg" data-observe-once>
            This div uses the CSS class-based reveal
          </div>
          
          <ScrollReveal direction="left">
            <div className="p-6 bg-muted rounded-lg">
              This should slide in from the left
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right" delay={200}>
            <div className="p-6 bg-muted rounded-lg">
              This should slide in from the right with a delay
            </div>
          </ScrollReveal>
          
          <StaggeredReveal staggerDelay={150}>
            <div className="p-4 bg-muted/50 rounded-lg">Item 1</div>
            <div className="p-4 bg-muted/50 rounded-lg">Item 2</div>
            <div className="p-4 bg-muted/50 rounded-lg">Item 3</div>
          </StaggeredReveal>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Typewriter Animations</h2>
        <div className="space-y-6">
          <div className="p-6 bg-card rounded-lg">
            <h3 className="text-xl font-medium mb-2">Simple Typewriter:</h3>
            <TypewriterText text="Welcome to the animation test page!" />
          </div>
          
          <div className="p-6 bg-card rounded-lg">
            <h3 className="text-xl font-medium mb-2">Multi-text Typewriter:</h3>
            <TypewriterText 
              textArray={[
                "Accept payments easily.", 
                "Customize your hub.", 
                "Grow your business."
              ]}
              loop={true}
            />
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">CSS Animation Utilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-card rounded-lg animate-shimmer overflow-hidden">
            animate-shimmer
          </div>
          
          <div className="p-6 bg-card rounded-lg animate-pulse-slow">
            animate-pulse-slow
          </div>
          
          <div className="p-6 bg-card rounded-lg animate-float">
            animate-float
          </div>
          
          <div className="p-6 bg-card rounded-lg hover-lift">
            hover-lift
          </div>
          
          <div className="p-6 bg-card rounded-lg glow-on-hover">
            glow-on-hover
          </div>
        </div>
      </section>
      
      <div className="fixed bottom-4 right-4">
        <Button variant="secondary" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          Back to Top
        </Button>
      </div>
    </div>
  );
} 