import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './footer.sass'
import { Link } from 'react-router-dom'

// Компонент подвала сайта
function Footer() {
	return (
		<footer>
			<Link to={ '/' } className={ 'footer__title' }><h2>Book<span>Store</span></h2></Link>

			<div className="footer-links">
				<div className="footer-links__column">
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
				<div className="footer-links__column">
					<div className="row column">
						<span className="col footer-links__column-title">Ссылки</span>
						<span className="col footer__link">Активировать купон</span>
						<span className="col footer__link">Публичная оферта</span>
						<span className="col footer__link">Политика обработки персональных данных</span>
						<span className="col footer__link">Согласие на получение рассылки</span>
					</div>
				</div>
				<div className="footer-links__column">
					<div className="row column">
						<span className="col footer-links__column-title">Сотрудничество</span>
						<span className="col footer__link">Издательствам</span>
						<span className="col footer__link">Авторам</span>
						<span className="col footer__link">Библиотекам</span>
						<span className="col footer__link">Партнёрам</span>
						<span className="col footer__link">Вебмастерам</span>
						<span className="col footer__link">Компаниям</span>
					</div>
				</div>
				<div className="footer-links__column">
					<div className="row column">
						<span className="col footer-links__column-title">Связь</span>
						<span className="col">
								<div className="row ai-center jc-center">
									<span className="col w-10"><FontAwesomeIcon className={ 'about_us-icon' }
																				icon={ faLocationDot }/></span>
									<span className="col">119454, ЦФО, г. Москва, Проспект Вернадского, д. 78</span>
								</div>
							</span>
						<span className="col">
								<div className="row ai-center jc-center">
									<span className="col w-10"><FontAwesomeIcon className={ 'about_us-icon' }
																				icon={ faPhone }/></span>
									<span className="col">+7 999 999-99-99</span>
								</div>
							</span>
						<span className="col">
								<div className="row ai-center jc-center">
									<span className="col w-10"><FontAwesomeIcon className={ 'about_us-icon' }
																				icon={ faEnvelope }/></span>
									<span className="col">example@mail.com</span>
								</div>
							</span>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer