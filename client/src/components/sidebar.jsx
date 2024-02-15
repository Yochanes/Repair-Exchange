import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import SERVER_PATH from '../constants/SERVER_PATH'
import { selectUser } from '../slices/user.slice'
import SidebarMenu from './menu/SidebarMenu'
function Sidebar() {
	const location = useLocation()

	const user = useSelector(selectUser)
	const [offersCount, setOffersCount] = useState(0)
	const [isHovered, setIsHovered] = useState(false)
	useEffect(() => {
		const count = Math.floor(Math.random() * 10)
		setOffersCount(count)
	}, [])

	return (
		<div>
			<div className='fixed-content'>
				<div className='left-content'>
					<div className='dffds'>
						<div className='img-content'>
							<img src={SERVER_PATH + user.avatar} alt='' />
							<h3>
								{user.name} {user.lastname}
							</h3>
						</div>
						<div className='stars'>
							<p>
								{user.master?.[0]?.rating}{' '}
								<Rating
									readonly
									initialValue={user.master?.[0]?.rating}
									size='22'
								/>{' '}
								{user.master?.[0]?.number_of_feedbacks}
							</p>
						</div>
					</div>
					<ul className='ul-wrap'>
						<li
							className={
								location.pathname.includes('/master/wallet') ? 'active' : ''
							}
						>
							<img src='/img/img-exit.png' alt='' />
							<Link to='/master/wallet'> Кошелек</Link>
						</li>
						<li
							className={
								location.pathname.includes('/master/settings') ? 'active' : ''
							}
						>
							<img src='/img/img-contact.png' alt='' />
							<Link to='/master/settings'> Настройки</Link>
						</li>
						<li
							className={
								location.pathname.includes('/master/chat') ||
								location.pathname.includes('/168789461')
									? 'active'
									: ''
							}
						>
							<img src='/img/img-massage.png' alt='' />
							<Link to='/master/chat'>Чат</Link>
						</li>
						<li
							className={
								location.pathname.includes('/master/orders') ? 'active' : ''
							}
						>
							<img src='/img/img-list.png' alt='' />
							<Link to='/master/orders'> Мои заявки</Link>
						</li>
						<li
							className={
								location.pathname.includes('/master/feedback') ? 'active' : ''
							}
						>
							<img src='/img/img-white-star.png' alt='' />
							<Link to='/master/feedback'> Мои отзывы</Link>
						</li>
						<li
							className={
								location.pathname.includes('/master/requests') ? 'active' : ''
							}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							<div className='offers-counter'>
								<img src='/img/img-list-2.png ' alt='' />
								<Link to='/master/requests'> Биржа заказов</Link>
								{isHovered && (
									<div className='counter'>{offersCount}</div>
								)}
							</div>
						</li>
					</ul>

					<Link to='/login'>
						<div className='icon df'>
							<img src='/img/img-exit-2.png' alt='' />
							<h2>Выйти</h2>
						</div>
					</Link>
				</div>
			</div>
			<SidebarMenu active={false} setActive={() => {}} /> {/* Передаем false для отключения SidebarMenu */}
		</div>
	)
}

export default Sidebar
