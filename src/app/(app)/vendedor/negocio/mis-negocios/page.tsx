'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { obtenerMisNegocios } from '@/services/negocio.service'

interface Negocio {
    id: string
    nombre: string
    categoria: string
    direccion: string
    ciudad: string
    horario: string
    descripcion: string
    calificacion_promedio: number
    activo: boolean
}

export default function MisNegociosPage() {
    const router = useRouter()
    const [negocios, setNegocios] = useState<Negocio[]>([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const cargarNegocios = async () => {
            try {
                const supabase = createSupabaseBrowserClient()
                const { data: { session } } = await supabase.auth.getSession()

                if (!session) {
                    router.push('/iniciar-sesion')
                    return
                }

                const resultado = await obtenerMisNegocios(session.access_token)

                if (!resultado.success) {
                    setError(resultado.mensaje)
                    return
                }

                setNegocios(resultado.data)

            } catch (err) {
                setError('Error al cargar los negocios')
            } finally {
                setCargando(false)
            }
        }

        cargarNegocios()
    }, [router])

    if (cargando) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Cargando tus negocios...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Mis negocios
                    </h1>
                    <button
                        onClick={() => router.push('/vendedor/negocio/crear')}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
                    >
                        + Agregar negocio
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                {negocios.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow p-10 text-center">
                        <p className="text-gray-500 mb-4">
                            Aún no tienes negocios registrados
                        </p>
                        <button
                            onClick={() => router.push('/vendedor/negocio/crear')}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                        >
                            Crear mi primer negocio
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {negocios.map((negocio) => (
                            <div
                                key={negocio.id}
                                className="bg-white rounded-2xl shadow p-6 flex justify-between items-start"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {negocio.nombre}
                                        </h2>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${negocio.activo
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-500'
                                            }`}>
                                            {negocio.activo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        {negocio.categoria} — {negocio.ciudad}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {negocio.direccion}
                                    </p>
                                    {negocio.horario && (
                                        <p className="text-sm text-gray-400 mt-1">
                                            🕐 {negocio.horario}
                                        </p>
                                    )}
                                    <p className="text-sm text-orange-500 mt-1">
                                        ⭐ {negocio.calificacion_promedio || 0} calificación promedio
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2 ml-4">
                                    <button
                                        onClick={() => router.push(`/vendedor/negocio/${negocio.id}/editar`)}
                                        className="text-sm text-blue-500 hover:underline"
                                    >
                                        Editar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}