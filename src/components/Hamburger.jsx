export default function Hamburger() {
  return (
    <>
      <div className="hamburger w-8 h-8 flex flex-col justify-around flex-nowrap z-10">
        <div className="burger burger1 w-8 h-1 rounded-xl bg-white origin-2 transition-all duration-300 ease-linear" />
        <div className="burger burger1 w-8 h-1 rounded-xl bg-white origin-2 transition-all duration-300 ease-linear" />
        <div className="burger burger1 w-8 h-1 rounded-xl bg-white origin-2 transition-all duration-300 ease-linear" />
      </div>
    </>
  );
}
