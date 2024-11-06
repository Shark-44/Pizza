import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { useOrderManagement } from '../hooks/useOrderManagement';
import { createOrder } from '../api/orderService';

// Mock les hooks et fonctions API pour éviter les vraies requêtes réseau
jest.mock("../hooks/useOrderManagement");
jest.mock("../api/orderService");

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("affiche le message de chargement pendant le chargement des données", () => {
    (useOrderManagement as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      currentOrder: null,
      newOrderNumber: null
    });

    render(<Home />, { wrapper: BrowserRouter });
    expect(screen.getByText("Chargement...")).toBeInTheDocument();
  });

  it("affiche un message d'erreur en cas d'erreur de récupération des données", () => {
    (useOrderManagement as jest.Mock).mockReturnValue({
      loading: false,
      error: "Erreur de chargement",
      currentOrder: null,
      newOrderNumber: null
    });

    render(<Home />, { wrapper: BrowserRouter });
    expect(screen.getByText("Erreur de chargement")).toBeInTheDocument();
  });

  it("crée une nouvelle commande et navigue vers la page commande en cas de succès", async () => {
    (useOrderManagement as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      currentOrder: null,
      newOrderNumber: "12345"
    });

    // Mock l'API pour qu'elle renvoie une commande fictive
    (createOrder as jest.Mock).mockResolvedValue({ id: "new-order-id" });

    render(<Home />, { wrapper: BrowserRouter });

    const button = screen.getByRole("button", { name: /label3/i });
    fireEvent.click(button);

    // Vérifie que la fonction `createOrder` est bien appelée avec le bon argument
    await waitFor(() => {
      expect(createOrder).toHaveBeenCalledWith("12345", expect.any(String));
    });

    // Vérifie que la navigation a bien été effectuée
    expect(window.location.pathname).toBe("/Order");
  });

  it("affiche un message d'erreur en cas d'échec de création de commande", async () => {
    (useOrderManagement as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      currentOrder: null,
      newOrderNumber: "12345"
    });

    // Mock l'API pour simuler une erreur
    (createOrder as jest.Mock).mockRejectedValue(new Error("Erreur API"));

    render(<Home />, { wrapper: BrowserRouter });

    const button = screen.getByRole("button", { name: /label3/i });
    fireEvent.click(button);

    // Vérifie que le message d'erreur de création est affiché
    await waitFor(() => {
      expect(screen.getByText("Erreur lors de la création/récupération de la commande")).toBeInTheDocument();
    });
  });
});
