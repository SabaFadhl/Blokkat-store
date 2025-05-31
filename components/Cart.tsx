
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Cart() {
  return (
<div className="relative cursor-pointer" >
            <FontAwesomeIcon
            icon="shopping-cart"
            className=" text-gray-700 text-xl text-indigo-600"
            />
            <span
            v-if="cartItems.length > 0"
            className="absolute -top-2 -right-2 text-[10px] h-5 w-5 flex items-center justify-center bg-red-500 text-white text-2xs rounded-full"
            >
            6
            {/* {{ cartItems.length }} */}
            </span>
        </div>
  )
}