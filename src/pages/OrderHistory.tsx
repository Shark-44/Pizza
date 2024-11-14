import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import useFetchOrdersHistory from "../hooks/useFetchOrdersHistory";
import { OrdersHistory, FilterOption } from "../types/types";
import { useState } from "react";

interface Product {
  quantiteCommande: number | string; 
}
interface Order {
  produits: Product[];
  subOrders?: Product[]; 
  prixtotalCommande?: number;
}

const OrderHistory = () => {
  /* Pour evoltion avec filter
   const { ordersHistory, error, loading } = useFetchOrdersHistory(filter);
  */
  const { ordersHistory, error, loading } = useFetchOrdersHistory();
  const ordersInProgress = ordersHistory.filter((order) => order.statusCommande === 'payé');
  const [filter, setFilter] = useState<string | undefined>(undefined);
console.log(filter)
  // Fonction pour compter le nombre total de ventes
const calculateTotalSales = (orders: string | any[]) => {
  return orders.length;
};

//Fonction pour calculer la somme des prix
const calculateTotalPrice = (orders:OrdersHistory[]) => {
  return orders.reduce((sum, order) => sum + Number(order.prixtotalCommande), 0);
};

  // Fonction pour calculer la quantité des produits vendu
  const calculateTotalQuantity = (orders: OrdersHistory[]) => {
    return orders.reduce((sum, order) => {
      if (!order.products) {
        return sum;
      }
      
      const orderTotal = order.products.reduce((productSum, product) => {
        return productSum + (product.quantiteCommande || 0);
      }, 0);
      
      return sum + orderTotal;
    }, 0);
  };
  
const totalSales = calculateTotalSales(ordersInProgress);
const totalPrice = calculateTotalPrice(ordersInProgress);
const totalQuantity = calculateTotalQuantity(ordersInProgress);



  // Données factices pour les boutons de filtre
  const filtersState: FilterOption[] = [
    FilterOption.TODAY,
    FilterOption.THIS_WEEK,
    FilterOption.THIS_MONTH,
    FilterOption.THIS_YEAR,
  ];
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  // Configuration du graphique en barres
  const chartConfig = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Quantité vendue",
        data: [150, 75, 200, 50], // Quantités factices pour Pizza, Pâtes, Boissons, Desserts
      },
    ],
    options: {
      chart: {
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      colors: ["#020617"],
      plotOptions: {
        bar: { columnWidth: "40%", borderRadius: 2 },
      },
      xaxis: {
        categories: ['Pizza', 'Pâtes', 'Boissons', 'Desserts'],
        axisTicks: { show: false },
        axisBorder: { show: false },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: { lines: { show: true } },
        padding: { top: 5, right: 20 },
      },
      fill: { opacity: 0.8 },
      tooltip: { theme: "dark" },
    },
  };

  // Gestion des erreurs
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-yellow-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Gestion du chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-yellow-50">
        <p className="text-blue-500">Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Section des filtres */}
      <div className="flex gap-4 mb-4">
        {filtersState.map((currentFilter) => (
          <button
            key={currentFilter}
            className={`px-4 py-2 rounded ${
              filter === currentFilter ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            onClick={() => handleFilterChange(currentFilter)}
          >
            {currentFilter}
          </button>
        ))}
      </div>


      {/* Section des indicateurs et du graphique */}
      <div className="flex gap-8">
        {/* Colonne des indicateurs */}
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-gray-500">Nombre total de ventes</h3>
            <p className="text-xl font-semibold">{totalSales}</p>
          </div>
          <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-gray-500">Prix total</h3>
            <p className="text-xl font-semibold">{totalPrice}€</p>
          </div>
          <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-gray-500">Quantité totale vendue</h3>
            <p className="text-xl font-semibold">{totalQuantity}  unités</p>
          </div>
        </div>

        {/* Section graphique */}
        <div className="flex-1 p-4 bg-white rounded shadow-md">
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Quantités vendues par produit
                </Typography>
                <Typography variant="small" color="gray" className="max-w-sm font-normal">
                  Visualisez les quantités vendues pour chaque type de produit.
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
              <Chart {...chartConfig} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
