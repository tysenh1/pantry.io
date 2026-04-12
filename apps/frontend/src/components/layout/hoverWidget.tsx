

const HoverWidget: React.FC<{ isVisible: boolean; children: React.ReactNode }> = ({ isVisible = true, children }) => {
  return (
    (isVisible && <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs">
      {children}
    </div>)
  )
}

export default HoverWidget
