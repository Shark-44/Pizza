import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

// Composant principal de l'historique des commandes
const OrderHistory: React.FC = () => {
  // Données factices pour les boutons de filtre
  const filters = ['Aujourd’hui', 'Cette semaine', 'Ce mois-ci', 'Cette année'];

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

  return (
    <div className="container mx-auto p-4">
      {/* Section des filtres */}
      <div className="flex gap-4 mb-4">
        {filters.map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Section des indicateurs et du graphique */}
      <div className="flex gap-8">
        {/* Colonne des indicateurs */}
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-gray-500">Nombre total de ventes</h3>
            <p className="text-xl font-semibold">475</p>
          </div>
          <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-gray-500">Prix total</h3>
            <p className="text-xl font-semibold">€2,350</p>
          </div>
          <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-gray-500">Quantité totale vendue</h3>
            <p className="text-xl font-semibold">475 unités</p>
          </div>
        </div>

        {/* Section graphique */}
        <div className="flex-1 p-4 bg-white rounded shadow-md">
          <Card children={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <CardHeader
                          floated={false}
                          shadow={false}
                          color="transparent"
                          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center" children={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" children={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  Quantités vendues par produit
                </Typography>
                <Typography
                                  variant="small"
                                  color="gray"
                                  className="max-w-sm font-normal" children={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  Visualisez les quantités vendues pour chaque type de produit.
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0" children={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <Chart {...chartConfig} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
