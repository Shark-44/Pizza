import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import useFetchOrdersHistory from "../hooks/useFetchOrdersHistory";
import useFetchTypes from "../hooks/useFetchTypes"; 
import { calculateTotalSales, calculateTotalPrice, calculateTotalQuantity } from '../utils/orderUtils';
import { OrdersHistory, Type } from "../types/types";
import { useState } from "react";


const OrderHistory = () => {

  const [filter, setFilter] = useState<string | undefined>(undefined);
  const { ordersHistory, error, loading } = useFetchOrdersHistory(filter);
  const ordersInProgress = ordersHistory.filter((order) => order.statusCommande === 'payé');
 


  const types = useFetchTypes("fr");

// Préparation des données pour le graphique
const prepareChartData = (orders: OrdersHistory[], types: Type[]) => {
  const productQuantities: { [key: string]: number } = {};

  // Initialiser les quantités à 0 pour chaque type de produit
  types.forEach((type) => {
    productQuantities[type.nomType] = 0; 
  });


  // Parcours des commandes pour accumuler les quantités par type de produit
  orders.forEach((order) => {
    if (order.products) {
      order.products.forEach((product) => {
        if (productQuantities[product.nomType] !== undefined) { 
          productQuantities[product.nomType] += product.quantiteCommande;
        }
      });
    }
  });



  // Préparer les données pour le graphique en utilisant les noms des types comme catégories
  return {
    categories: types.map((type) => {
      //console.log("Category type.nomType:", type.nomType); 
      return type.nomType;
    }),
    seriesData: types.map((type) => productQuantities[type.nomType] || 0), 
  };
};


  const chartData = prepareChartData(ordersInProgress, types);
    
  const totalSales = calculateTotalSales(ordersInProgress);
  const totalPrice = calculateTotalPrice(ordersInProgress);
  const totalQuantity = calculateTotalQuantity(ordersInProgress);

// Pour les filtres mais valeur non envoyée
  const filtersState = [
    { label: "Aujourd'hui", value: "D" },
    { label: "Cette semaine", value: "W" },
    { label: "Ce mois-ci", value: "M" },
    { label: "Cette année", value: "Y" },
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
        name: "Sales",
        data: chartData.seriesData,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: chartData.categories,
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
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
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
      {filtersState.map(({ label, value }) => (
          <button
            key={value}
            className={`px-4 py-2 rounded ${
              filter === value
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => handleFilterChange(value)}
          >
            {label}
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
                Tableau de ventes
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
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
