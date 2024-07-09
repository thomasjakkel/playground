import './style.css'
import reactLogo from '@/assets/react.svg'

export const BasicTestComponent = (): JSX.Element => {
  return (
    <div className='testContainer'>
      <div>
        <span className='basicTestComponent'>This is a basic component</span>
        <br />
        <div className='imageContainer'>
          <span className='spacexx'>Edit this react component</span>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </div>
      </div>
    </div>
  )
}
