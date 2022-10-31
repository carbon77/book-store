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
						<div className="row column gap-0">
							<span className="col">Сотрудничество</span>
							<span className="col">Контакты</span>
							<span className="col">Вакансии</span>
							<span className="col">Служба поддержки</span>
						</div>
					</div>
					<div className="col footer-links__column">
						<div className="row column gap-0">
							<span className="col">Активировать купон</span>
							<span className="col">Публичная оферта</span>
							<span className="col">Политика обработки персональных данных</span>
							<span className="col">Согласие на получение рассылки</span>
						</div>
					</div>
					<div className="col footer-links__column">
						<div className="row column gap-0">
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
						<div className="row column gap-0">
							<div className="col footer-links__column-title">Социальные сети</div>
							<div className="col">
								<div className="row">
									<div className="col social-button"><FontAwesomeIcon icon="fa-brands fa-facebook" /></div>
									<div className="col social-button"><FontAwesomeIcon icon="fa-brands fa-facebook" /></div>
									<div className="col social-button"><FontAwesomeIcon icon="fa-brands fa-facebook" /></div>
									<div className="col social-button"><FontAwesomeIcon icon="fa-brands fa-facebook" /></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-partners"></div>
		</footer>
	)
}

export default Footer