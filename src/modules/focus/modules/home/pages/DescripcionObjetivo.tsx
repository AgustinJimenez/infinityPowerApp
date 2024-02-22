import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ActivityBell from 'src/modules/activity/components/ActivityBell';
import Header from 'src/modules/common/components/Header';
import Screen from 'src/modules/common/components/Screen';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import Card from 'src/modules/common/components/Card';
import CardTitle from 'src/modules/common/components/CardTitle';
import image from 'src/assets/images/new-home.png';

const RightComponent = ({ }) => {
  return (
    <></>
  );
};

const LeftComponent = ({ }) => {
  return (
    <></>
  );
};

const Objetivo = ({ id, titulo, info }) => {
  const tituloStyle = tw`flex-1 text-lg text-white font-bold`
  tituloStyle.color = "#0DDFCA"
  
  return <TouchableOpacity style={tw`my-3`}>
    <ViewY spacing={0} style={{borderRadius:17, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
          <Card style={tw`p-5`}>
            <ViewX spacing={4}>
              <ViewY spacing={4} style={tw`flex-grow`}>
                <ViewY spacing={0} style={tw`flex-grow justify-center`}>
                  {titulo && <ViewX>
                    <Text style={tituloStyle}>{titulo}</Text>
                  </ViewX>}
                  {info && <ViewX>
                    <Text style={tw`flex-wrap flex-1 mt-1 text-xs text-white`}>{info}</Text>
                  </ViewX>}
                </ViewY>
              </ViewY>
            </ViewX >
          </Card>
      </ViewY>
    </TouchableOpacity>
}


const DescripcionObjetivo = ({ route, navigation }) => {
  const viewStyleBorder = tw`justify-center pt-3 mx-5`
  viewStyleBorder.borderTopWidth = 0.5
  viewStyleBorder.borderColor = "#ccc"

  const objetivos = {
    1: {
        titulo: "La Fórmula",
        id: 1,
        descripcion: 'En que Consiste: Cada persona debe ser consciente permanentemente de que cada situación que experimenta, sea esta favorable, indiferente o adversa, está regida por una fórmula:\n\nResultado = Evento + Respuesta\n\nLa misma es mencionada por Jack Canfield en su libro Los Principios del Éxito y puede ser analizada teniendo presente dos puntos importantes:\nPrimero: El evento es un factor externo que ya ocurrió y generalmente poco o nada puede hacerse para modificarlo;\nSegundo: La respuesta sin embargo depende íntegramente de cada uno y está en directa relación con la perspectiva.\n\nEs realmente muy simple: A mejor perspectiva del evento, mejor respuesta y por tanto mejor resultado o desenlace de la situación.\n\nDe la misma manera, se debe también tomar conciencia de una consecuencia inevitable de la fórmula: una respuesta desacertada puede echar a perder incluso un evento por más favorable que sea.'
    },
    2: {
        titulo: "Una persona exitosa ve oportunidades en cada dificultad",
        id: 2,
        descripcion: 'En que Consiste: John D. Rockefeller decía “Siempre intenté convertir cada desastre en una oportunidad”. Sus palabras reflejan una gran verdad: Un obstáculo siempre trae consigo oportunidades.\nImagina ¿cómo cambiaría la vida de una persona si cada vez que enfrenta un obstáculo, automáticamente su mente activara los mecanismos para identificar la oportunidad? ¿Cambiaría para mejor? ¡Categóricamente sí!\n\nPara ello, son cuatro los aspectos a tener en cuenta:\n\n1. Siempre se puede convertir un obstáculo en una oportunidad. Cuando una persona supera la adversidad de esta manera, resulta aún más fortalecida que antes de enfrentar ese evento despertando así la admiración y el reconocimiento de todos.\n\n2. La clave está en la percepción, entendiendo que la percepción es la forma en que las personas ven y entienden lo que ocurre a su alrededor definiendo así la significancia que tendrán estos eventos en sus vidas, condicionando categóricamente el estado emocional y por ende la respuesta a cualquier situación.\nA mejor percepción del evento, mejor definición de su significancia, por ende, mejor estado emocional y mejor respuesta.\n\n3. Nunca se debe enfocar la mente en el obstáculo; la mente debe ser enfocada sólo en la oportunidad, ya sea para encontrarla o ya encontrada para ejecutarla.\n\n4. La oportunidad encontrada debe traerse y vivirse en el presente como si ya fuera realidad. Hacer esto una y otra vez, permitirá que esa visualización se transforme en su fuente de energía y motivación.\nResponder a un obstáculo buscando identificar la oportunidad inicialmente requiere un cierto esfuerzo, esto es normal en el proceso de generación de un nuevo hábito, y es en esta etapa inicial donde es imprescindible tanto la repetición diaria ininterrumpida como la persistencia.\n\nLuego, una vez incorporado el hábito, la mejora de percepción y por tanto la respuesta ante un determinado evento será automática, sin esfuerzo adicional, teniendo como consecuencia, un mejor Enfoque y el aprovechamiento de los beneficios que esto conlleva.'
    },
    3: {
        titulo: "Mejora tu Objetividad",
        id: 3,
        descripcion: 'En que Consiste: En intentar percibir el evento o el obstáculo como si le estuviera ocurriendo a otra persona.\n\n¡Así como lo lees! Piensa. Si ese obstáculo se hubiera presentado a una persona conocida ¿qué le dirías?, ¿qué le aconsejarías?, ¿cómo analizarías la situación?\n\nNormalmente somos buenos para analizar los desafíos que otras personas deben superar, sencillamente porque nuestras emociones se mantienen bajo control.\n\nEsta perspectiva, además de controlar las emociones, permitirá mantener una visión uniforme y coherente de los hechos como son (dimensionar el evento en su justa medida.) \n\nDe esta manera, si se observa el problema como si fuera de una persona cercana, se volverá más clara la solución y ésta aparecerá fluidamente. Es en las actividades cotidianas que debe desarrollarse esta habilidad.\n\nLa frase “esto sucedió y es malo” encierra, en realidad, dos impresiones. La primera, “esto sucedió…”, es objetiva. La segunda, “…y es malo”, es subjetiva, depende de cada uno y de la percepción que cada uno tenga del evento.\n\nEnfrentar el evento que se presenta y analizarlo como si le estuviera sucediendo a una persona cercana y no a uno mismo, inicialmente requiere un cierto esfuerzo, esto es normal en el proceso de generación de un nuevo hábito, y es en esta etapa inicial donde es imprescindible tanto la repetición diaria ininterrumpida como la persistencia.\n\nLuego, una vez incorporado el hábito, la mejora de la percepción y por tanto de la respuesta ante un determinado evento será automática, sin esfuerzo adicional, teniendo como consecuencia, la mejora en el Enfoque y el aprovechamiento de los beneficios que esto conlleva.'
    },
    4: {
        titulo: "Historia de Resiliencia",
        id: 4,
        descripcion: 'En que Consiste: Tener presente en todo momento a una persona cuya historia de resiliencia y superación sea impactante y pueda servir de guía; sobre todo en los momentos en los cuales se deban superar eventos o situaciones desafiantes. \n\nAl adquirir el hábito de preguntarse, ¿Cómo respondería (nombre de la persona) en esta situación?, ¿Qué haría o que diría? u otras preguntas en la misma línea, inmediatamente se estarán sentando las bases para mejorar la percepción del evento o la situación desafiante.\n\n¿Se puede tener presente a más de una persona? – La respuesta es sí. Se puede identificar una persona cuya historia de vida resulte motivante para cada una de las dimensiones o aspectos de la vida, ya sea el aspecto profesional, personal, familiar, etc.\n\n¿Quién puede ser esta persona? – La persona cuya historia nos motive puede ser un familiar, un personaje histórico, un referente de éxito empresarial, un deportista, un amigo o cualquier persona que despierte admiración e inspiración.\n\nEl objetivo es tener presente en la cotidianeidad, ante cualquier evento, la forma en que respondería o pensaría la persona que representa el ideal en ese ámbito específico para modificar así significativamente la percepción ante esa situación.\n\nRecuerda que la percepción es la forma en que la mente percibe los eventos e interpreta lo que ocurre alrededor, decidiendo qué significancia tendrán estos para cada uno.\n\nPor lo tanto, si las percepciones son orientadas en la misma línea de la persona que representa el ideal, constituirán sin dudas, una fuente de fortaleza.\n\nPreguntarse ¿Cómo respondería la persona que representa el ideal en esta situación?, ¿Qué haría o que diría? inicialmente requiere un cierto esfuerzo, esto es normal en el proceso de generación de un nuevo hábito, y es en esta etapa inicial donde es imprescindible tanto la repetición diaria ininterrumpida como la persistencia.\n\nLuego, una vez incorporado el hábito, la mejora de la percepción y por tanto de la respuesta ante un determinado evento será automática, sin esfuerzo adicional, teniendo como consecuencia, la mejora en el Enfoque y el aprovechamiento de los beneficios que esto conlleva.'
    },
    5: {
        titulo: "El optimista ve una oportunidad en cada dificultad",
        id: 5,
        descripcion: 'En que Consiste: Cada situación que represente para ti un obstáculo siempre encierra una oportunidad. Depende solo de ti encontrar esa solución que convierta el obstáculo en oportunidad de modo que, al superarlo, salgas aún más fortalecido que antes de enfrentar la adversidad; una solución que te merezca la admiración y el reconocimiento de todos. Enfócate en eso, trae esa oportunidad aprovechada y vívela en el presente como si ya fuera realidad una y otra vez. Esa será tu fuente de energía y motivación.\n\nLa clave está en la percepción, entendiendo que la percepción es la forma en que ves y entiendes lo que ocurre a tu alrededor, y a partir de la cual tu mente decidirá qué significancia tendrá ese evento para ti. Tus percepciones, por tanto, bien pueden ser tu fuente de fortaleza o de gran debilidad.\nCada obstáculo encierra una oportunidad. El hábito que debes incorporar a tu vida se relaciona con tu reacción al percibir un obstáculo; en vez de frenarte, renegar de tu suerte y sentirte mal; debes inmediatamente buscar identificar la oportunidad para salir más fortalecido. Debes entrenar tu mente hasta que la respuesta automática a un obstáculo sea buscar la oportunidad.\n\nImagina ¿cómo cambiaría tu vida si cada vez que enfrentes un obstáculo, automáticamente tu mente active sus mecanismos para identificar la oportunidad? ¿Cambiaría para mejor? Si tu respuesta es sí, entonces ¿Qué esperas? Es solo mejorar tu percepción. Depende absolutamente de ti. ¡Empieza!\n\nPor simple que parezca, no subestimes esta propuesta de hábito a incorporar. Recuerda que las cosas sencillas generalmente son las más poderosas. Lo realmente imprescindible es la repetición y la persistencia.'
    },
    6: {
        titulo: "Los 5 sentidos para calmar la mente, clarificarla y fortalecer su dominio",
        id: 6,
        descripcion: 'En que Consiste: Identificar una actividad en la rutina diaria a la que normalmente no se presta mucha atención o que se realice de forma casi automática. Puede ser comer, tomar una ducha, o algo tan básico como respirar.\n\nPrimero se debe buscar prestar atención consciente a la experiencia que se haya elegido. Esto es: mantener la concentración por el mayor tiempo posible, dirigiendo específicamente la atención a cualquiera de los cinco sentidos que intervienen en la actividad.\n\nAl intentar enfocar la atención, por un determinado tiempo, en la experiencia escogida, la mente tratará de escapar dispersándose constantemente. Con persistencia, enfóquela de vuelta, una y otra vez. Es normal que al principio cueste, pero con el tiempo y el entrenamiento será más fácil y paulatinamente alcanzará el dominio mental.\n\nEn el proceso de dominar su mente enfocando su atención una y otra vez logrará también gradualmente calmar su mente.\n\nEn este punto es importante tener presente la comparación del vaso de agua con sedimentos. Si se agita un vaso de agua con sedimentos, ¿Cómo estará el agua?\n\nEvidentemente, turbia. Así está normalmente la mente: agitada, turbia, estresada. En el mundo en que vivimos, lleno de estímulos, incertidumbre y cambios, la mente está constantemente exigida; pero ¿Qué pasa con el vaso de agua y sedimentos cuando se deja inmóvil durante unos pocos minutos?\n\nLos sedimentos van al fondo, y el agua, entonces, se aclara, se limpia. Lo mismo sucede con la mente cuando es entrenada de forma regular para que se mantenga en el aquí y ahora durante las experiencias cotidianas. Los sedimentos que no dejaban ver y sentir correctamente van despejándose. La mente luego de calmarse propiciará las condiciones para alcanzar la claridad mental.\n\nNo subestimes este entrenamiento. Recuerda que las cosas sencillas generalmente son las más poderosas. Lo realmente imprescindible es la repetición y la persistencia ininterrumpida, día a día.'
    },
    7: {
        titulo: "Las dos Preguntas",
        id: 7,
        descripcion: 'En que Consiste: Concentrarse en las actividades, es decir, focalizar la mente de forma intencional en el aquí y ahora, en la actividad que se esté desarrollando, verificando permanentemente que las preguntas ¿qué estoy haciendo ahora? y ¿en qué estoy pensando? tengan la misma respuesta.\n\n¿Por qué esto es importante? Porque la comprobación permanente de que estas dos preguntas tengan la misma respuesta, constituye el medio por el cual, las personas pueden mantener sus pensamientos en el momento presente, logrando así:\n\n1. mejorar su productividad,\n2. disfrutar más de cada situación, y\n3. evitar el divagar de la mente.\nAunque mejorar en productividad y disfrutar de cada actividad evitando que la mente divague es importante, no debe perderse de vista el objetivo principal:\n\nEntrenar la mente para dominarla y así facilitar el enfoque mental en el tiempo y sólo en aquello que se desea.\n\nEste camino llevará a la mejora del estado emocional, favoreciendo el paso a la acción y generando las vibraciones que atraerán todo aquello en lo que se ha puesto el enfoque.\n\nSi una persona se plantea de forma permanente y en cualquier momento las dos simples preguntas: “¿qué estoy haciendo ahora? y ¿en qué estoy pensando?” podrá obtener información valiosa de su capacidad de concentrarse en sus actividades.\n\nA partir de esta información, si las respuestas a estas dos preguntas son coincidentes, la mente se encontrará concentrada en el aquí y ahora, en la actividad que la persona está llevando adelante, pero si las respuestas son diferentes, significa que la mente se ha fugado y se deberá “traerla de vuelta” reorientando su atención y concentración.\nLas dos preguntas y la secuencia que se activa a partir de ellas requiere un esfuerzo inicial como sucede normalmente en el proceso de generación de un nuevo hábito donde es imprescindible tanto la repetición diaria ininterrumpida como la persistencia.\n\nLuego, una vez incorporado el hábito, la atención y concentración en la actividad que se esté desarrollando será automática, sin esfuerzo adicional, reflejando en ese momento un aumento en el control de la mente y como consecuencia, el aprovechamiento de los beneficios que esto conlleva.'
    },
    8: {
        titulo: "Esos pequeños grandes momentos",
        id: 8,
        descripcion: 'En que Consiste: El hábito consiste en regalarse permanentemente instantes de celebración al identificar cualquier buena experiencia por pequeña que sea, potenciando la emoción que esto genera y haciendo que el momento se hunda en el interior de la mente.\n\nAl retener la sensación positiva por algunos segundos, repitiendo una y otra vez una afirmación de refuerzo como “Cada vez me va mejor y mejor, me siento una maravilla, todo está saliendo bien” o alguna otra, las pequeñas experiencias cotidianas de la vida puedan ser capitalizadas convirtiéndose en redes neuronales útiles y duraderas, aprovechando para el bienestar, no solamente los grandes momentos sino aquellos que muchas veces pasan desapercibidos.\n\nPara incorporar el hábito, primero debe superarse el denominado Sesgo de Negatividad instalado en la memoria biológica de cada persona.\n\nEste Sesgo de Negatividad significa que el cerebro se ha especializado en aprender las malas experiencias (porque eran importantes para la supervivencia), tendiendo a olvidar las buenas.\n\n¿Cuál es la receta para revertir el Sesgo de Negatividad; qué se requiere? Solamente la predisposición, de manera consciente, a identificar momentos y situaciones cotidianas, a las que habitualmente se presta poca o ninguna atención pero que representan pequeños logros en cualquier aspecto de la vida.\n\nLa Teoría Hebbiana que describe el mecanismo básico de plasticidad sináptica del cerebro (es decir, cómo se conectan las neuronas) a menudo se resume como “Las neuronas que se disparan juntas, permanecen conectadas”\n\nDe ella se desprende que, si se persiste en los estados mentales relacionados con las experiencias positivas, estos estados mentales se convertirán eventualmente en rasgos mentales duraderos, con los beneficios que ello conlleva.'
    },
    9: {
        titulo: "Identifica y Bloquea al Pensamiento Negativo",
        id: 9,
        descripcion: 'En que Consiste: En el momento de tomar conciencia de un pensamiento negativo debe crearse una afirmación totalmente opuesta y repetirla varias veces hasta cerciorarse que ese pensamiento negativo haya desaparecido. Esta misma afirmación se puede utilizar en caso de que ese pensamiento negativo sea recurrente.\n\nSea cual sea el pensamiento negativo, inmediatamente se debe crear una afirmación simple que declare exactamente lo opuesto al pensamiento negativo. También de forma alternativa se puede crear una pequeña visualización, donde ocurra exactamente lo opuesto a lo que ocurre en el pensamiento negativo. Entonces, si una persona tiene el pensamiento negativo de que va enfermar, debe visualizarse gozando de una perfecta salud o bien debe repetir por unos minutos “Me encuentro rebosante de salud, siento energía infinita en mi ser” o alguna otra exactamente opuesta a su pensamiento negativo. Si este mecanismo de bloqueo es repetido hasta ser convertido en un hábito, pasará que cuando llegue el miedo o los pensamientos negativos, estos serán identificados e inmediatamente serán ahogados con unos minutos de afirmaciones y visualizaciones positivas.\n\nEl miedo y los pensamientos negativos deben ser inmediatamente bloqueados, ya que no son otra cosa que el poder de la mente actuando en reversa, es decir, en contra de uno mismo. Si una persona siente miedo o tiene pensamientos negativos, significa que su poder mental está siendo enfocado justamente en aquello que no quiere que ocurra. Manteniendo pensamientos negativos estará concentrando su energía y sus emociones en generar las vibraciones que finalmente terminaran atrayendo a su vida justo aquello que no quería que suceda.\n\nEl Bloqueo de Pensamientos Negativos como recurso para mantener la mente Enfocada solo en aquello que la persona quiere que ocurra, no requiere de un momento preciso para su práctica. Es en las actividades cotidianas que debe desarrollarse la habilidad de bloquear los pensamientos negativos hasta que lograr convertir esta reacción en un hábito.\n\nPor simple que parezca, esta propuesta de hábito no debe ser subestimada. Es importante tener presente que las cosas sencillas generalmente son las más poderosas. Instalar el hábito, inicialmente requiere un esfuerzo por generar intencionalmente la respuesta esperada; y en esta etapa es imprescindible la repetición diaria ininterrumpida y la persistencia, pero luego, una vez incorporado el hábito, será posible disfrutar de los beneficios de bloquear los pensamientos negativos con afirmaciones y visualizaciones contrarias a ellos de forma automática.'
    },
    10: {
        titulo: "Reconocer e ignorar al saboteador mental",
        id: 10,
        descripcion: 'En que Consiste: Identificar e ignorar la voz del saboteador mental.\n\nEs ampliamente conocido y aceptado que la voz del saboteador mental es la voz dentro de la mente que provoca pensamientos negativos y por consiguiente emociones negativas.\n\nLa voz del saboteador y los pensamientos destructivos que dicta, buscan disminuir de varias maneras la salud mental y emocional de las personas, impidiéndoles responder de forma adecuada y evitando que estas tomen acciones para cambiar a bien sus vidas.\n\nCada persona tiene un saboteador que quiere hacerse con el control de su mente y sus pensamientos; pero es la mente quien genuinamente debe tener el control de estos, y para ello debe debilitar y minimizar la voz de su saboteador. ¿Cómo se puede lograr?\n\nSi una persona toma conciencia de su saboteador, personificándolo, es decir generando una imagen mental de él, reconociendo su voz y asignándole un nombre; ocurrirá que cuando escuche a su saboteador, podrá fácilmente identificarlo e ignorarlo repitiéndose ‘’Nuevamente (Nombre del saboteador interno) está intentando influenciarme negativamente’’ o alguna otra expresión que crea conveniente.\n\nEl objetivo del ejercicio es ser consciente de la existencia del saboteador y actuar con él de la misma forma que con las personas toxicas; se las identifica, evade, ignora y bloquea, evitando que afecten la salud mental y emocional.\n\nEn las actividades cotidianas debe desarrollarse la habilidad de identificar e ignorar al saboteador, siempre teniendo presente que, aunque no sea posible eliminar su voz, si es posible debilitarla, buscando que nos resulte más sencillo ignorarla.\n\nNo obstante, si eventualmente el saboteador lograra filtrar un pensamiento destructivo, se debe tener presente que el pensamiento inculcado por el saboteador, por más negativo que sea, si no es convertido en emoción nunca llegará a afectar a quien lo tiene.\n\nIdentificar e ignorar la voz del saboteador inicialmente requiere un cierto esfuerzo, esto es normal en el proceso de generación de un nuevo hábito, y es en esta etapa inicial donde es imprescindible tanto la repetición diaria ininterrumpida como la persistencia.\n\nLuego, una vez incorporado el hábito, el Bloqueo de Pensamientos Negativos será automático, sin esfuerzo adicional, teniendo como consecuencia, la mejora en el Enfoque y el aprovechamiento de los beneficios que esto conlleva.'
    },
  }

  const dispatch = useDispatch();

  const idObjetivo = route.params.id;

  const convertirStyle = tw`text-lg`
  convertirStyle.color = "#0DDFCA";

  return (
    <SafeAreaView style={{width: "100%", height: "100%"}}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, paddingTop: 50}}>
            <ScrollView style={{flex: 1, alignContent: "space-between", paddingHorizontal: 3}}>
                <ViewX style={tw`justify-center`}>
                    <Text style={tw`text-white text-2xl pt-2 text-center font-bold`}>{objetivos[idObjetivo].titulo}</Text>
                </ViewX>
                <ViewY style={tw`bg-white min-h-150 flex-grow p-6 justify-between`} spacing={2}>
                    <Text style={tw`text-black`}>{objetivos[idObjetivo].descripcion}</Text>
                    <TouchableOpacity style={tw`flex items-center self-stretch `} onPress={() => navigation.navigate('ObjectiveFocus', {id: objetivos[idObjetivo].id}) }>
                        <Text style={convertirStyle}>Convertir a Objetivo</Text>
                    </TouchableOpacity>
                </ViewY>
            </ScrollView>
        </ImageBackground>
    </SafeAreaView>
  );
};

export default DescripcionObjetivo;
