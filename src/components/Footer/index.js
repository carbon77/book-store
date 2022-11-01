import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './footer.sass'
import { Link } from 'react-router-dom'

function Footer() {
	return (
		<footer>
			<Link to={ '/' } className={ 'footer__title' }><h2>Book<span>Store</span></h2></Link>

			<div className="footer-links">
				<div className="row">
					<div className="col footer-links__column">
						<div className="row column">
							<div className="col footer-links__column-title">Социальные сети</div>
							<div className="col">
								<div className="row">
									<div className="col social-button"><FontAwesomeIcon icon="fa-brands fa-telegram"/>
									</div>
									<div className="col social-button"><FontAwesomeIcon icon="fa-brands fa-twitter"/>
									</div>
									<div className="col social-button"><FontAwesomeIcon icon="fa-brands fa-linkedin"/>
									</div>
									<div className="col social-button"><FontAwesomeIcon icon="fa-brands fa-vk"/></div>
								</div>
							</div>
						</div>
					</div>
					<div className="col footer-links__column">
						<div className="row column">
							<span className="col footer-links__column-title">Ссылки</span>
							<span className="col">Активировать купон</span>
							<span className="col">Публичная оферта</span>
							<span className="col">Политика обработки персональных данных</span>
							<span className="col">Согласие на получение рассылки</span>
						</div>
					</div>
					<div className="col footer-links__column">
						<div className="row column">
							<span className="col footer-links__column-title">Сотрудничество</span>
							<span className="col">Издательствам</span>
							<span className="col">Авторам</span>
							<span className="col">Библиотекам</span>
							<span className="col">Партнёрам</span>
							<span className="col">Вебмастерам</span>
							<span className="col">Компаниям</span>
						</div>
					</div>
					<div className="col footer-links__column">
						<div className="row column">
							<span className="col footer-links__column-title">Связь</span>
							<span className="col">
								<div className="row ai-center jc-center">
									<span className="col w-10"><FontAwesomeIcon className={'about_us-icon'} icon={ faLocationDot }/></span>
									<span className="col">119454, ЦФО, г. Москва, Проспект Вернадского, д. 78</span>
								</div>
							</span>
							<span className="col">
								<div className="row ai-center jc-center">
									<span className="col w-10"><FontAwesomeIcon className={'about_us-icon'} icon={ faPhone }/></span>
									<span className="col">+7 999 999-99-99</span>
								</div>
							</span>
							<span className="col">
								<div className="row ai-center jc-center">
									<span className="col w-10"><FontAwesomeIcon className={'about_us-icon'} icon={ faEnvelope }/></span>
									<span className="col">example@mail.com</span>
								</div>
							</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer