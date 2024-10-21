function Banner() {
    return (
      <div className="bg-black h-20 w-full fixed top-0 flex items-center">
        <div className="relative h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full overflow-hidden">
          <div
            className="absolute inset-[-35px] bg-cover bg-center"
            style={{
              backgroundImage: `url('src/assets/Images/logo.webp')`,
            }}
          />
        </div>
        <div className="flex-grow flex items-center justify-center">
          <h2 className="font-satisfy text-lg sm:text-2xl md:text-3xl font-semibold text-customOrange text-center px-4">
            Chez Pizza Sorrizo, n'oublie pas ta carte de fidélité
          </h2>
        </div>
      </div>
    );
  }
  
  export default Banner;
  