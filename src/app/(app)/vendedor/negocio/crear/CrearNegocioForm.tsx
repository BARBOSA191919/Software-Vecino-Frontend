'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { crearNegocio } from '@/services/negocio.service'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

const CATEGORIAS = [
    'Panadería', 'Restaurante', 'Tienda',
    'Cafetería', 'Frutas y Verduras',
    'Carnicería', 'Farmacia', 'Otro'
]

export default function CrearNegocioForm() {
    const router = useRouter()
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState({
        nombre: '',
        descripcion: '',
        categoria: '',
        direccion: '',
        ciudad: 'Armenia',
        horario: ''
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setCargando(true)
        setError('')

        try {
            const supabase = createSupabaseBrowserClient()
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                router.push('/iniciar-sesion')
                return
            }

            const resultado = await crearNegocio(session.access_token, form)

            if (!resultado.success) {
                setError(resultado.mensaje)
                return
            }

            router.push('/vendedor/negocio/mis-negocios')

        } catch (err) {
            setError('Error al crear el negocio. Intenta de nuevo.')
        } finally {
            setCargando(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Crea tu negocio
                </h1>
                <p className="text-gray-500 mb-6">
                    Completa la información para aparecer en Vecino
                </p>

                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre del negocio *
                        </label>
                        <input
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                            placeholder="Ej: Panadería San Carlos"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Categoría *
                        </label>
                        <select
                            name="categoria"
                            value={form.categoria}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                            <option value="">Selecciona una categoría</option>
                            {CATEGORIAS.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Cuéntanos sobre tu negocio..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dirección *
                        </label>
                        <input
                            name="direccion"
                            value={form.direccion}
                            onChange={handleChange}
                            required
                            placeholder="Ej: Calle 15 # 8-42"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ciudad
                        </label>
                        <input
                            name="ciudad"
                            value={form.ciudad}
                            onChange={handleChange}
                            placeholder="Armenia"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Horario
                        </label>
                        <input
                            name="horario"
                            value={form.horario}
                            onChange={handleChange}
                            placeholder="Ej: Lunes a Sábado 6am - 8pm"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={cargando}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                    >
                        {cargando ? 'Creando negocio...' : 'Crear negocio'}
                    </button>
                </form>
            </div>
        </div>
    )
}