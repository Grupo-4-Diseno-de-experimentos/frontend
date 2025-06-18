import {Component, ViewChild} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import { NgIf } from '@angular/common';
import { User } from '../../../meal-plan/model/meal-plan.entity';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  standalone: true,
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  showTermsModal = false;
  showPrivacyModal = false;
  termsAccepted = false;
  privacyAccepted = false;
  termsText = `
    <div class="terms-container">
      <header>
        <h1>Términos y Condiciones de NutriSmart</h1>
        <p class="introduction">Al acceder y utilizar la plataforma NutriSmart, usted acepta los siguientes términos y condiciones en su totalidad.</p>
      </header>

      <section class="definitions">
        <h2>1. Definiciones</h2>
        <p>A los efectos de estos Términos y Condiciones, los siguientes términos tendrán los significados que se indican a continuación:</p>
        <ul>
          <li><strong>"NutriSmart"</strong> se refiere a nuestra plataforma web y móvil destinada a la planificación alimentaria y la conexión con profesionales de la nutrición.</li>
          <li><strong>"Usuario"</strong> se refiere a cualquier persona que acceda o utilice la Plataforma, ya sea buscando planes de alimentación o como profesional de la nutrición.</li>
          <li><strong>"Plataforma"</strong> se refiere al sitio web y las aplicaciones móviles de NutriSmart.</li>
          <li><strong>"Nutricionista"</strong> se refiere a un profesional de la nutrición registrado en la Plataforma.</li>
          <li><strong>"Plan de Alimentación"</strong> se refiere a las recomendaciones dietéticas personalizadas generadas o proporcionadas a través de la Plataforma.</li>
        </ul>
      </section>

      <section class="user-rights">
        <h2>2. Derechos del Usuario</h2>
        <ol>
          <li><strong>Acceso a la Plataforma:</strong> El Usuario tiene derecho a acceder y utilizar la Plataforma de acuerdo con estos términos.</li>
          <li><strong>Generación de Planes:</strong> Los usuarios que buscan mejorar su alimentación tienen derecho a generar planes de alimentación personalizados según la funcionalidad ofrecida.</li>
          <li><strong>Acceso a Nutricionistas (si aplica):</strong> Los usuarios con suscripciones premium pueden tener derecho a contactar con Nutricionistas registrados.</li>
          <li><strong>Información Clara:</strong> El Usuario tiene derecho a recibir información clara y transparente sobre el funcionamiento de la Plataforma y los servicios ofrecidos.</li>
          <li><strong>Modificación de Cuenta:</strong> El Usuario registrado tiene derecho a modificar su información personal dentro de los límites permitidos.</li>
          <li><strong>Baja de Cuenta:</strong> El Usuario tiene derecho a dar de baja su cuenta en cualquier momento, siguiendo el procedimiento establecido.</li>
        </ol>
      </section>

      <section class="user-obligations">
        <h2>3. Obligaciones del Usuario</h2>
        <ol>
          <li><strong>Uso Adecuado:</strong> El Usuario se compromete a utilizar la Plataforma de manera lícita, ética y respetuosa.</li>
          <li><strong>Información Precisa:</strong> El Usuario se obliga a proporcionar información veraz y actualizada al registrarse y al utilizar la Plataforma, especialmente en lo referente a sus objetivos, restricciones y preferencias alimentarias.</li>
          <li><strong>Confidencialidad de la Cuenta:</strong> El Usuario es responsable de mantener la confidencialidad de su nombre de usuario y contraseña.</li>
          <li><strong>Responsabilidad del Contenido:</strong> El Usuario es responsable del contenido que publique o comparta en la Plataforma.</li>
          <li><strong>Cumplimiento de Pagos (si aplica):</strong> En caso de suscripciones premium o servicios de pago, el Usuario se obliga a realizar los pagos correspondientes.</li>
        </ol>
      </section>

      <section class="user-restrictions">
        <h2>4. Restricciones del Usuario</h2>
        <ol>
          <li><strong>Uso No Comercial:</strong> Se prohíbe utilizar la Plataforma con fines comerciales no autorizados.</li>
          <li><strong>Ingeniería Inversa:</strong> Está prohibido intentar realizar ingeniería inversa, descompilar o acceder al código fuente de la Plataforma.</li>
          <li><strong>Actividades Maliciosas:</strong> Se prohíbe la introducción de virus, malware o cualquier otro código dañino.</li>
          <li><strong>Suplantación de Identidad:</strong> Se prohíbe suplantar la identidad de otros usuarios.</li>
          <li><strong>Violación de Derechos de Terceros:</strong> Se prohíbe infringir los derechos de propiedad intelectual o cualquier otro derecho de terceros al utilizar la Plataforma.</li>
        </ol>
      </section>

      <footer>
        <p>Fecha de Última Actualización: 13 de Mayo de 2025</p>
        <p>Contacto: nutrismartcontacto@gmail.com</p>
      </footer>
    </div>
  `;
  privacyText = `
    <div class="privacy-container">
      <header>
        <h1>Política de Privacidad de NutriSmart</h1>
        <p class="introduction">Su privacidad es importante para nosotros. Esta política explica cómo NutriSmart recopila, utiliza y protege su información personal en el contexto de nuestra plataforma de planificación alimentaria y conexión con nutricionistas.</p>
      </header>

      <section class="information-collected">
        <h2>1. Información que Recopilamos</h2>
        <p>Para ofrecer nuestros servicios y personalizar su experiencia, podemos recopilar la siguiente información:</p>
        <ul>
          <li><strong>Información de Registro:</strong> Nombre y apellidos, correo electrónico, contraseña, tipo de usuario (cliente o nutricionista).</li>
          <li><strong>Información del Perfil:</strong> Objetivos nutricionales, restricciones alimentarias, preferencias de recetas, nivel de actividad física, datos demográficos (edad, género, ubicación).</li>
          <li><strong>Datos de Uso de la Plataforma:</strong> Interacciones con la plataforma, planes de alimentación generados, recetas consultadas, historial de mensajes con nutricionistas (si aplica).</li>
          <li><strong>Información Técnica:</strong> Dirección IP, tipo de dispositivo, navegador, datos de cookies y tecnologías similares.</li>
          <li><strong>Información de Pago (si aplica):</strong> Datos necesarios para procesar suscripciones o pagos por servicios premium.</li>
        </ul>
      </section>

      <section class="how-we-use-your-information">
        <h2>2. Cómo Utilizamos su Información</h2>
        <p>Utilizamos su información personal para los siguientes fines:</p>
        <ol>
          <li><strong>Gestionar su Cuenta:</strong> Crear y mantener su cuenta de usuario y verificar su identidad.</li>
          <li><strong>Personalizar Planes de Alimentación:</strong> Generar planes y recomendaciones dietéticas adaptadas a sus necesidades y preferencias.</li>
          <li><strong>Conectar con Nutricionistas (si aplica):</strong> Facilitar la comunicación entre usuarios premium y nutricionistas registrados.</li>
          <li><strong>Mejorar la Plataforma:</strong> Analizar el uso de la plataforma para mejorar su funcionalidad, diseño y contenido.</li>
          <li><strong>Comunicación:</strong> Enviar información sobre actualizaciones, nuevas funciones, ofertas y soporte técnico.</li>
          <li><strong>Seguridad:</strong> Proteger la plataforma y a los usuarios contra el fraude y el acceso no autorizado.</li>
          <li><strong>Cumplimiento Legal:</strong> Cumplir con las obligaciones legales aplicables.</li>
        </ol>
      </section>

      <section class="sharing-your-information">
        <h2>3. Compartir su Información</h2>
        <p>Podemos compartir su información personal con terceros en las siguientes circunstancias:</p>
        <ul>
          <li><strong>Con Nutricionistas (si aplica):</strong> Si usted es un usuario premium, compartiremos la información necesaria para que los nutricionistas puedan ofrecerle sus servicios.</li>
          <li><strong>Proveedores de Servicios:</strong> Compartimos información con proveedores que nos ayudan a operar la plataforma (ej: alojamiento web, procesamiento de pagos, análisis). Estos proveedores están obligados a proteger su información.</li>
          <li><strong>Cumplimiento Legal:</strong> Podemos divulgar información si así lo exige la ley o una orden judicial.</li>
          <li><strong>Consentimiento:</strong> Con su consentimiento explícito, podemos compartir su información con otros terceros.</li>
          <li><strong>Datos Agregados y Anónimos:</strong> Podemos compartir datos agregados y anónimos que no identifican personalmente a los usuarios para fines de análisis y mejora.</li>
        </ul>
      </section>

      <section class="your-rights">
        <h2>4. Sus Derechos de Protección de Datos</h2>
        <p>Usted tiene los siguientes derechos con respecto a su información personal:</p>
        <ul>
          <li><strong>Derecho de Acceso:</strong> Puede solicitar acceder a la información personal que tenemos sobre usted.</li>
          <li><strong>Derecho de Rectificación:</strong> Puede solicitar la corrección de información personal inexacta o incompleta.</li>
          <li><strong>Derecho de Supresión:</strong> Puede solicitar la eliminación de su información personal, bajo ciertas condiciones.</li>
          <li><strong>Derecho de Oposición:</strong> Puede oponerse al tratamiento de su información personal en determinadas circunstancias.</li>
          <li><strong>Derecho a la Portabilidad de los Datos:</strong> Puede solicitar recibir una copia de su información personal en un formato estructurado y de uso común.</li>
          <li><strong>Derecho a Retirar el Consentimiento:</strong> Si ha dado su consentimiento para el tratamiento de su información, puede retirarlo en cualquier momento.</li>
        </ul>
        <p>Para ejercer estos derechos, por favor contáctenos a través de la información proporcionada en la sección de contacto.</p>
      </section>

      <section class="data-security">
        <h2>5. Seguridad de sus Datos</h2>
        <p>Implementamos medidas de seguridad técnicas y organizativas razonables para proteger su información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Estas medidas incluyen el cifrado de datos sensibles, controles de acceso y revisiones de seguridad periódicas.</p>
      </section>

      <section class="data-retention">
        <h2>6. Retención de Datos</h2>
        <p>Conservaremos su información personal durante el tiempo que sea necesario para proporcionarle los servicios, cumplir con nuestras obligaciones legales, resolver disputas y hacer cumplir nuestros acuerdos.</p>
      </section>

      <section class="changes-to-this-policy">
        <h2>7. Cambios a esta Política de Privacidad</h2>
        <p>Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos cualquier cambio significativo publicando la nueva política en nuestra plataforma o mediante otros medios de comunicación. Le recomendamos revisar esta política regularmente.</p>
      </section>

      <section class="contact-us">
        <h2>8. Contáctenos</h2>
        <p>Si tiene alguna pregunta o inquietud sobre esta Política de Privacidad o nuestras prácticas de datos, por favor contáctenos en:</p>
        <p>Correo electrónico: nutrismartcontacto@gmail.com</p>
      </section>

      <footer>
        <p>Fecha de Última Actualización: 13 de Mayo de 2025</p>
        <p>Contacto: nutrismartcontacto@gmail.com</p>
      </footer>
    </div>
  `;

  @ViewChild('registerForm') registerForm!: NgForm;
  constructor(private router: Router, private authService: AuthService) { }

  openTermsModal() {
    this.showTermsModal = true;
  }

  closeTermsModal() {
    this.showTermsModal = false;
  }

  acceptTerms() {
    this.termsAccepted = true;
    this.closeTermsModal();
  }

  openPrivacyModal() {
    this.showPrivacyModal = true;
  }

  closePrivacyModal() {
    this.showPrivacyModal = false;
  }

  acceptPrivacy() {
    this.privacyAccepted = true;
    this.closePrivacyModal();
  }

  onSubmit(formData: any) {
    console.log('Datos de registro:', formData);
    if (this.termsAccepted && this.privacyAccepted && this.registerForm?.valid) {
      const user: any = {
        name: formData.name + ' ',
        lastName: formData.lastName + ' ',
        email: formData.email,
        password: formData.password,
        role: formData.role,
        created_at: new Date().toISOString()
      };
      this.authService.create(user).subscribe({
        next: () => {
          console.log('Usuario registrado');
          if (user.role.toLowerCase() === 'nutricionist') {
            this.router.navigate(['/profile']); // Redirige a la pantalla de perfil
          } else {
            this.router.navigate(['/start-objectives']); // Redirige a la pantalla de objetivos
          }
        },
        error: (err) => {
          console.error('Error al registrar un usuario', err);
        }
      });
    } else{
      alert('Debes aceptar los Términos y Condiciones y la Política de Privacidad para registrarte.');
    }
  }

  canRegister() {
    return this.termsAccepted && this.privacyAccepted && this.registerForm?.valid;
  }

}
