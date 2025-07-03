"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Video, Play, Users, Globe, Shield, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [showVideoDemo, setShowVideoDemo] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Sofia",
      message: "¡Hola! ¿Cómo estás?",
      time: "10:30",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      user: "Tú",
      message: "¡Muy bien! ¿Y tú qué tal?",
      time: "10:32",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      user: "Sofia",
      message: "Genial, ¿te gustaría hacer una videollamada?",
      time: "10:33",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const addMessage = () => {
    const newMessage = {
      id: messages.length + 1,
      user: "Tú",
      message: "¡Me encantaría!",
      time: "10:35",
      avatar: "/placeholder.svg?height=40&width=40",
    }
    setMessages([...messages, newMessage])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              StreamScape
            </span>
          </div>
          <div className="flex space-x-4">
            <Link href="/login">
              <Button variant="ghost">Iniciar Sesión</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Conecta con personas de todo el mundo
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            StreamScape te permite conocer gente nueva a través de conversaciones significativas y videollamadas
            auténticas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3"
              >
                Comenzar Gratis
              </Button>
            </Link>
            <Dialog open={showVideoDemo} onOpenChange={setShowVideoDemo}>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Demo de Videollamada</DialogTitle>
                  <DialogDescription>Así es como funciona una videollamada en StreamScape</DialogDescription>
                </DialogHeader>
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
                  <div className="absolute inset-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-80" />
                      <p className="text-lg">Videollamada en progreso...</p>
                      <p className="text-sm opacity-80">Conectando corazones alrededor del mundo</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4">
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">10M+</div>
              <div className="text-gray-600">Usuarios activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50M+</div>
              <div className="text-gray-600">Conversaciones</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">150+</div>
              <div className="text-gray-600">Países</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Prueba la experiencia</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Chat Demo */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat en tiempo real</span>
                </CardTitle>
                <CardDescription>Conecta instantáneamente con personas afines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.user === "Tú" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`flex items-start space-x-2 max-w-xs ${msg.user === "Tú" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{msg.user[0]}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`rounded-lg px-3 py-2 ${msg.user === "Tú" ? "bg-purple-600 text-white" : "bg-gray-100"}`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${msg.user === "Tú" ? "text-purple-200" : "text-gray-500"}`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button onClick={addMessage} className="w-full">
                  Enviar mensaje
                </Button>
              </CardContent>
            </Card>

            {/* Video Call Demo */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Video className="w-5 h-5" />
                  <span>Videollamadas HD</span>
                </CardTitle>
                <CardDescription>Conversaciones cara a cara de alta calidad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-gray-600">Videollamada simulada</p>
                    <p className="text-sm text-gray-500">Calidad HD cristalina</p>
                  </div>
                </div>
                <Button onClick={() => setShowVideoDemo(true)} className="w-full">
                  Iniciar videollamada
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir StreamScape?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global</h3>
              <p className="text-gray-600">Conecta con personas de más de 150 países</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Seguro</h3>
              <p className="text-gray-600">Verificación de identidad y moderación 24/7</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rápido</h3>
              <p className="text-gray-600">Conexiones instantáneas con tecnología avanzada</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comunidad</h3>
              <p className="text-gray-600">Únete a una comunidad vibrante y acogedora</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Planes para todos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Básico</CardTitle>
                <CardDescription>Perfecto para empezar</CardDescription>
                <div className="text-3xl font-bold">Gratis</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>5 conexiones por día</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Chat básico</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Videollamadas de 10 min</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full bg-transparent" variant="outline">
                    Comenzar gratis
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-purple-200 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600">
                Más popular
              </Badge>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>Para usuarios activos</CardDescription>
                <div className="text-3xl font-bold">
                  $9.99<span className="text-sm font-normal">/mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Conexiones ilimitadas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Chat avanzado con stickers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Videollamadas ilimitadas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Filtros de ubicación</span>
                  </li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Elegir Premium
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>VIP</CardTitle>
                <CardDescription>Experiencia completa</CardDescription>
                <div className="text-3xl font-bold">
                  $19.99<span className="text-sm font-normal">/mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Todo de Premium</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Perfil destacado</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Soporte prioritario</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Funciones exclusivas</span>
                  </li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full bg-transparent" variant="outline">
                    Elegir VIP
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para encontrar tu conexión perfecta?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Únete a millones de personas que ya han encontrado conversaciones significativas en StreamScape
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3"
            >
              Comenzar ahora - Es gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">StreamScape</span>
              </div>
              <p className="text-gray-400">Conectando corazones alrededor del mundo</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Seguridad
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Acerca de
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Carreras
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Centro de ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StreamScape. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
