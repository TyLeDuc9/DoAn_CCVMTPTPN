import banner from '../../assets/banner1.jpg'

export const Banner = () => {
  return (
    <div className="w-full overflow-hidden">
      <img 
        src={banner} 
        alt="banner organic food" 
        className="w-full h-60 md:h-80 lg:h-[500px] object-cover object-center transition-all duration-500"
      />
    </div>
  )
}