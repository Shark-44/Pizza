
export const incrementOrderNumber = (lastOrderNumber: string): string => {
    // Enlève le premier caractère (ex : "A01" devient "01")
    const numberPart = parseInt(lastOrderNumber.slice(1), 10); 
    
    // Incrémente le numéro
    const newNumber = numberPart + 1; 
    
    // Formate le numéro pour qu'il soit toujours à deux chiffres (par exemple, "A01", "A02", ... "A99")
    const formattedNumber = String(newNumber).padStart(2, '0');

    return `A${formattedNumber}`; // Ajoute le préfixe
};
