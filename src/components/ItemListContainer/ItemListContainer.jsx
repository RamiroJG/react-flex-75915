import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Items from '../Items/Items'
import Tabs from '../Tabs/Tabs'
import fetchData from '../../fetchData'
import './ItemListContainer.css'

const ItemListContainer = () => {
    const { categoria } = useParams()
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState(categoria || "all")

    useEffect(() => {
        fetchData().then(data => {
            setProductos(data)
            setLoading(false)
        })
    }, [])

    // Cada vez que cambie la categoría en la URL, actualiza el estado
    useEffect(() => {
        if (categoria) {
            setActiveTab(categoria)
        } else {
            setActiveTab("all")
        }
    }, [categoria])

    // Filtramos según el activeTab (que se sincroniza con el param)
    const productosFiltrados =
        activeTab === "all"
            ? productos
            : productos.filter(item =>
                item.category.toLowerCase() === activeTab.toLowerCase()
            )

    return (
        <div style={{ paddingTop: "12rem" }}>
            <section className='contenedor'>
                <div className='flex-destacados-title'>
                    <h3>Productos destacados</h3>
                    <p>Descubre nuestra selección de productos más populares del mundo de Naruto</p>

                    {/* Tabs para cambiar de categoría */}
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                <div className='grid_items text-center'>
                    {loading ? (
                        <p>Cargando productos...</p>
                    ) : (
                        productosFiltrados.map(producto => (
                            <Items
                                key={producto.id}
                                id={producto.id}
                                nombre={producto.name}
                                precio={producto.price}
                                imagen={producto.image}
                                rating={producto.rating}
                                stock={producto.stock}
                                isNew={producto.isNew}
                                isBestseller={producto.isBestseller}
                                discountPrice={producto.discountPrice}
                            />
                        ))
                    )}
                </div>

                <div className='btn-products'>
                    <button className='all-products'>
                        Ver todos los productos
                    </button>
                </div>
            </section>
        </div>
    )
}

export default ItemListContainer
