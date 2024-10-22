
import FilterButtons from "./FilterButtons";
import OrderSummary from "./OrderSummary";


interface OrderItem {
    id: number;          
    name: string;       
    quantity: number;   
}


interface SidebarProps {
    orderItems: OrderItem[];  
}

const Sidebar = ({ orderItems }: SidebarProps) => {
    const hasOrdered = orderItems.length > 0;
  
    return (
      <div className="w-64 fixed top-20 left-0 h-[calc(100vh-5rem)] bg-gray-800 p-4 z-10">
        {hasOrdered ? (
            <div className='flex flex-col p-4 gap-y-4 my-16' >
            <FilterButtons />   
            </div>      
        ) : (
            <OrderSummary orderItems={orderItems} />
        )}
      </div>
    );
};

export default Sidebar;
