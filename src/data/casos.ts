import type { CasoClinico } from '../types';

/**
 * AVISO EDUCATIVO:
 * Todos los casos clínicos son FICTICIOS y elaborados con fines exclusivamente
 * educativos para estudiantes de Medicina de pregrado.
 * NO representan pacientes reales, NO constituyen diagnóstico médico y
 * NO deben usarse para tomar decisiones clínicas reales.
 */
export const CASOS_CLINICOS: CasoClinico[] = [
  {
    id: 'caso-001',
    titulo: 'Dolor torácico en paciente joven',
    asignatura: 'Semiología Médica',
    tema: 'Aparato Cardiovascular',
    dificultad: 'básico',
    descripcion:
      'Un joven de 22 años acude a urgencias refiriendo dolor torácico de inicio brusco. Se trata de un caso educativo para aprender el enfoque semiológico del dolor torácico.',
    paciente: {
      edad: 22,
      sexo: 'masculino',
      motivoConsulta:
        'Dolor torácico izquierdo de inicio súbito hace 3 horas, de tipo punzante, que aumenta con la inspiración profunda y con los movimientos.',
      antecedentes:
        'Contextura delgada, talla 1,85 m. Sin antecedentes patológicos conocidos. No fuma. Practica baloncesto recreativo.',
      examenFisico:
        'FC: 98 lpm, FR: 22 rpm, SpO₂: 94%, PA: 120/75 mmHg, T°: 36,8 °C. Disminución del murmullo vesicular en hemitórax izquierdo. Timpanismo a la percusión en región apical izquierda. Sin ruidos sobreañadidos.',
      examenes:
        'Radiografía de tórax: línea pleural visible a 2 cm del ápice pulmonar izquierdo con ausencia de trama vascular periférica.',
    },
    preguntas: [
      {
        id: 'p-001-1',
        enunciado:
          '¿Cuál es el diagnóstico más probable en este paciente?',
        opciones: [
          {
            id: 'o-1a',
            texto: 'Infarto agudo de miocardio',
            esCorrecta: false,
            explicacion:
              'Incorrecto. El IAM es poco probable en un paciente de 22 años sin factores de riesgo cardiovascular. El dolor del IAM es típicamente opresivo, irradiado al brazo o mandíbula, y no se modifica con los movimientos ni con la respiración.',
          },
          {
            id: 'o-1b',
            texto: 'Neumotórax espontáneo primario',
            esCorrecta: true,
            explicacion:
              'Correcto. El neumotórax espontáneo primario es típico en varones jóvenes, delgados y altos. El dolor es pleurítico (aumenta con la inspiración), hay disminución del murmullo vesicular y timpanismo ipsilateral. La radiografía confirma la línea pleural.',
          },
          {
            id: 'o-1c',
            texto: 'Pericarditis aguda',
            esCorrecta: false,
            explicacion:
              'Incorrecto. La pericarditis produce dolor que mejora al inclinarse hacia adelante y empeora al acostarse. Típicamente se ausculta un frote pericárdico. La radiografía no mostraría ausencia de trama vascular periférica.',
          },
          {
            id: 'o-1d',
            texto: 'Tromboembolismo pulmonar',
            esCorrecta: false,
            explicacion:
              'Incorrecto. El TEP puede causar dolor pleurítico y disnea, pero es más frecuente en pacientes con factores de riesgo (inmovilización, trombofilia, cirugía reciente). La radiografía mostraría signos como joroba de Hampton o signo de Westermark, no línea pleural.',
          },
        ],
        explicacionGeneral:
          'El neumotórax espontáneo primario ocurre en ausencia de enfermedad pulmonar subyacente conocida. El perfil clásico es el varón joven, delgado y alto, debido a mayor gradiente de presión en el ápice pulmonar. El dolor es de tipo pleurítico y la disminución del murmullo vesicular con timpanismo orienta al diagnóstico, confirmado por radiografía.',
        conceptoClave: {
          pregunta: '¿Cuál es el perfil típico del paciente con neumotórax espontáneo primario?',
          respuesta:
            'Varón joven (15-35 años), de contextura delgada y talla alta. Presenta dolor torácico pleurítico de inicio súbito, disnea, disminución del murmullo vesicular y timpanismo en el hemitórax afectado.',
        },
      },
      {
        id: 'p-001-2',
        enunciado:
          '¿Cuál de los siguientes hallazgos al examen físico es más característico de este diagnóstico?',
        opciones: [
          {
            id: 'o-2a',
            texto: 'Matidez a la percusión y abolición del murmullo vesicular',
            esCorrecta: false,
            explicacion:
              'Incorrecto. La matidez a la percusión sugiere la presencia de líquido (derrame pleural o hemotórax), no de aire en el espacio pleural.',
          },
          {
            id: 'o-2b',
            texto: 'Frote pleural audible en todas las fases respiratorias',
            esCorrecta: false,
            explicacion:
              'Incorrecto. El frote pleural es característico de pleuritis (inflamación de la pleura), no de neumotórax. En el neumotórax el murmullo vesicular está disminuido o abolido, pero no hay frote.',
          },
          {
            id: 'o-2c',
            texto: 'Timpanismo a la percusión con disminución del murmullo vesicular ipsilateral',
            esCorrecta: true,
            explicacion:
              'Correcto. En el neumotórax, el aire acumulado en el espacio pleural produce timpanismo a la percusión y aleja el pulmón de la pared torácica, disminuyendo o aboliendo el murmullo vesicular en el lado afectado.',
          },
          {
            id: 'o-2d',
            texto: 'Sibilancias espiratorias difusas bilaterales',
            esCorrecta: false,
            explicacion:
              'Incorrecto. Las sibilancias difusas sugieren obstrucción bronquial generalizada (asma, EPOC). En el neumotórax los hallazgos son unilaterales y de tipo percusorio y auscultatorio reducido.',
          },
        ],
        explicacionGeneral:
          'La semiología clásica del neumotórax incluye: disminución o abolición del murmullo vesicular, timpanismo a la percusión y posible desviación traqueal (en casos a tensión) en el hemitórax afectado. Estos hallazgos reflejan la acumulación de aire en el espacio pleural que colapsa el pulmón subyacente.',
        conceptoClave: {
          pregunta: '¿Qué hallazgos a la percusión y auscultación se esperan en el neumotórax?',
          respuesta:
            'Timpanismo a la percusión (por presencia de aire) y disminución o abolición del murmullo vesicular ipsilateral (por colapso del pulmón). En casos graves puede haber desviación traqueal contralateral.',
        },
      },
      {
        id: 'p-001-3',
        enunciado:
          '¿Cuál es el estudio de imagen de primera elección para confirmar el diagnóstico en urgencias?',
        opciones: [
          {
            id: 'o-3a',
            texto: 'Tomografía computarizada de tórax',
            esCorrecta: false,
            explicacion:
              'Incorrecto. La TC de tórax es más sensible que la Rx para detectar neumotórax pequeños, pero no es el estudio de primera elección en urgencias por su mayor costo, radiación y disponibilidad. Se reserva para casos dudosos o antes de procedimientos.',
          },
          {
            id: 'o-3b',
            texto: 'Ecografía torácica (POCUS)',
            esCorrecta: false,
            explicacion:
              'Incorrecto. Aunque la ecografía (punto de atención) es una herramienta valiosa en urgencias (ausencia del signo del deslizamiento pleural es muy sensible), en la mayoría de contextos de pregrado la radiografía de tórax sigue siendo el estándar de primera línea.',
          },
          {
            id: 'o-3c',
            texto: 'Radiografía de tórax en inspiración',
            esCorrecta: true,
            explicacion:
              'Correcto. La radiografía de tórax en proyección posteroanterior, tomada en inspiración, es el estudio de primera elección. Permite visualizar la línea pleural visceral, la ausencia de trama vascular periférica y estimar el tamaño del neumotórax.',
          },
          {
            id: 'o-3d',
            texto: 'Resonancia magnética de tórax',
            esCorrecta: false,
            explicacion:
              'Incorrecto. La RM no está indicada para el diagnóstico del neumotórax. No aporta ventajas sobre la Rx simple, es costosa, de difícil acceso en urgencias y tiene contraindicaciones.',
          },
        ],
        explicacionGeneral:
          'La radiografía de tórax en proyección PA en inspiración es el estudio estándar de primera línea para confirmar el neumotórax en urgencias. Muestra la línea pleural visceral (separada de la pared torácica), ausencia de trama vascular periférica en la zona del neumotórax y puede revelar el tamaño aproximado del mismo.',
        conceptoClave: {
          pregunta: '¿Qué se observa en la radiografía de tórax en el neumotórax espontáneo?',
          respuesta:
            'Línea pleural visceral visible separada de la pared torácica, con ausencia de trama vascular pulmonar en la zona afectada (entre la línea pleural y la pared). Si es a tensión puede verse desviación mediastínica contralateral.',
        },
      },
    ],
    conceptosClave: [
      {
        pregunta: '¿Cuál es la diferencia entre neumotórax espontáneo primario y secundario?',
        respuesta:
          'El primario ocurre sin enfermedad pulmonar subyacente conocida (típico en jóvenes delgados). El secundario complica una enfermedad pulmonar previa (EPOC, fibrosis quística, neumonía necrotizante, etc.) y suele ser más grave.',
        asignatura: 'Semiología Médica',
        tema: 'Aparato Respiratorio',
      },
      {
        pregunta: '¿Qué es el neumotórax a tensión y por qué es una emergencia?',
        respuesta:
          'Es la acumulación progresiva de aire en la cavidad pleural con mecanismo valvular, que comprime el mediastino y el pulmón contralateral, comprometiendo el retorno venoso y el gasto cardíaco. Puede causar paro cardiorrespiratorio si no se descomprime de urgencia.',
        asignatura: 'Semiología Médica',
        tema: 'Aparato Respiratorio',
      },
    ],
    advertenciaEducativa:
      'Este caso es exclusivamente ficticio con fines educativos. No constituye diagnóstico médico ni guía de tratamiento. Las decisiones clínicas reales deben tomarse bajo supervisión médica con base en la evaluación completa de cada paciente.',
  },

  // ─── CASO 2 ─────────────────────────────────────────────────────────────────
  {
    id: 'caso-002',
    titulo: 'Cefalea intensa de inicio súbito',
    asignatura: 'Neurología',
    tema: 'Cefaleas y Emergencias Neurológicas',
    dificultad: 'intermedio',
    descripcion:
      'Una mujer de 45 años describe la peor cefalea de su vida de inicio súbito. Caso educativo para reconocer señales de alarma en la cefalea.',
    paciente: {
      edad: 45,
      sexo: 'femenino',
      motivoConsulta:
        'Cefalea de inicio súbito ("como un trueno"), de máxima intensidad desde el primer momento, irradiada a la nuca, asociada a náuseas y fotofobia. Refiere que nunca había tenido una cefalea tan intensa.',
      antecedentes:
        'Hipertensión arterial en tratamiento. Sin cefalea crónica previa. Fumadora de 10 cigarrillos/día. Antecedente familiar de aneurisma cerebral en madre.',
      examenFisico:
        'PA: 168/95 mmHg, FC: 88 lpm, FR: 16 rpm, T°: 37,2 °C, SpO₂: 98%. Rigidez de nuca moderada. Kernig y Brudzinski positivos. Pupilas isocóricas y normorreactivas. Sin déficit motor ni sensitivo focal. Fondo de ojo: sin papiledema.',
      examenes:
        'TC de cráneo simple: sin hallazgos evidentes de sangrado en el parénquima cerebral.',
    },
    preguntas: [
      {
        id: 'p-002-1',
        enunciado:
          '¿Cuál es la causa más importante que debe descartarse en esta paciente?',
        opciones: [
          {
            id: 'o-4a',
            texto: 'Migraña con aura',
            esCorrecta: false,
            explicacion:
              'Incorrecto. Aunque la migraña puede ser intensa, no suele presentarse como "cefalea en trueno" de instalación súbita en una persona sin antecedentes de migraña. La cefalea de la migraña típicamente es pulsátil, unilateral y evoluciona en minutos a horas.',
          },
          {
            id: 'o-4b',
            texto: 'Hemorragia subaracnoidea (HSA)',
            esCorrecta: true,
            explicacion:
              'Correcto. La "cefalea en trueno" (thunderclap headache) de máxima intensidad desde el inicio es la presentación clásica de la HSA, generalmente por rotura de aneurisma cerebral. La rigidez de nuca y los signos meníngeos positivos refuerzan esta sospecha. Requiere evaluación urgente.',
          },
          {
            id: 'o-4c',
            texto: 'Neuralgia del trigémino',
            esCorrecta: false,
            explicacion:
              'Incorrecto. La neuralgia del trigémino produce dolor facial paroxístico de segundos, en el territorio del nervio trigémino, desencadenado por estímulos táctiles. No produce rigidez de nuca ni signos meníngeos.',
          },
          {
            id: 'o-4d',
            texto: 'Cefalea tensional episódica',
            esCorrecta: false,
            explicacion:
              'Incorrecto. La cefalea tensional es de carácter opresivo, bilateral, de intensidad leve a moderada y no produce signos meníngeos. No es la cefalea más intensa de la vida del paciente ni de inicio súbito.',
          },
        ],
        explicacionGeneral:
          'La "cefalea en trueno" (thunderclap headache) es la cefalea de máxima intensidad desde el primer instante, que alcanza su pico en menos de 60 segundos. Debe considerarse hemorragia subaracnoidea hasta que se demuestre lo contrario. Otros diagnósticos a excluir incluyen trombosis venosa cerebral, disección arterial y crisis hipertensiva.',
        conceptoClave: {
          pregunta: '¿Qué es la "cefalea en trueno" y cuál es su causa más grave?',
          respuesta:
            'Es una cefalea de máxima intensidad que alcanza su pico en menos de 60 segundos desde el inicio. La causa más grave y frecuente es la hemorragia subaracnoidea por rotura de aneurisma cerebral, que requiere evaluación de urgencia.',
        },
      },
      {
        id: 'p-002-2',
        enunciado:
          'La TC de cráneo simple es negativa. ¿Cuál es el siguiente paso diagnóstico más apropiado?',
        opciones: [
          {
            id: 'o-5a',
            texto: 'Alta médica con analgésicos y control ambulatorio',
            esCorrecta: false,
            explicacion:
              'Incorrecto. No debe darse alta con una sospecha de HSA sin haberla descartado completamente. La TC de cráneo simple puede ser negativa hasta en el 15% de los casos de HSA en las primeras 12 horas, especialmente en hemorragias pequeñas.',
          },
          {
            id: 'o-5b',
            texto: 'Punción lumbar para análisis del líquido cefalorraquídeo',
            esCorrecta: true,
            explicacion:
              'Correcto. Cuando la TC es negativa pero la sospecha clínica de HSA es alta, la punción lumbar está indicada. Se busca xantocromía (coloración amarillenta del LCR por degradación de hemoglobina) o presencia de eritrocitos que no disminuyen entre el primer y cuarto tubo, lo que confirma HSA.',
          },
          {
            id: 'o-5c',
            texto: 'Electroencefalograma de urgencia',
            esCorrecta: false,
            explicacion:
              'Incorrecto. El EEG no es el estudio de elección para descartar HSA. Puede mostrar cambios inespecíficos pero no aporta información diagnóstica decisiva en este contexto.',
          },
          {
            id: 'o-5d',
            texto: 'Resonancia magnética cerebral simple',
            esCorrecta: false,
            explicacion:
              'Incorrecto. Aunque la RM con secuencias FLAIR puede detectar sangre subaracnoidea, no es el siguiente paso estándar cuando la TC es negativa. La punción lumbar sigue siendo el estándar de referencia en este escenario clínico.',
          },
        ],
        explicacionGeneral:
          'La sensibilidad de la TC simple de cráneo para la HSA disminuye con el tiempo (≈98% en las primeras 6 h, ≈93% en 12 h). Cuando la TC es negativa y la sospecha clínica es alta, la punción lumbar permite buscar xantocromía o hemoglobina en el LCR, hallazgos que confirman el sangrado subaracnoideo.',
        conceptoClave: {
          pregunta: '¿Por qué la TC negativa no descarta la HSA y qué estudio se indica después?',
          respuesta:
            'La TC simple puede ser negativa hasta en el 15% de los casos de HSA (especialmente en hemorragias pequeñas o tardías). Si la sospecha es alta, se indica punción lumbar para buscar xantocromía o eritrocitos no aclarados entre tubos, que confirman el diagnóstico.',
        },
      },
      {
        id: 'p-002-3',
        enunciado:
          '¿Cuál de los siguientes es un factor de riesgo para el aneurisma cerebral intracraneal?',
        opciones: [
          {
            id: 'o-6a',
            texto: 'Diabetes mellitus tipo 2',
            esCorrecta: false,
            explicacion:
              'Incorrecto. La diabetes no es un factor de riesgo establecido para aneurismas cerebrales. Sí lo es para enfermedad vascular aterosclerótica, pero el mecanismo de formación aneurismática es diferente.',
          },
          {
            id: 'o-6b',
            texto: 'Antecedente familiar de aneurisma cerebral en familiar de primer grado',
            esCorrecta: true,
            explicacion:
              'Correcto. El antecedente familiar de aneurisma en un familiar de primer grado (especialmente si son dos o más) es un factor de riesgo reconocido. Otros factores incluyen tabaquismo, hipertensión arterial, poliquistosis renal autosómica dominante y síndrome de Ehlers-Danlos tipo IV.',
          },
          {
            id: 'o-6c',
            texto: 'Hipotiroidismo',
            esCorrecta: false,
            explicacion:
              'Incorrecto. El hipotiroidismo no es un factor de riesgo para aneurismas cerebrales. No existe una asociación fisiopatológica establecida entre ambas condiciones.',
          },
          {
            id: 'o-6d',
            texto: 'Obesidad',
            esCorrecta: false,
            explicacion:
              'Incorrecto. La obesidad no es un factor de riesgo directo para aneurismas cerebrales, aunque sí lo es para hipertensión arterial, que a su vez sí se asocia con aneurismas.',
          },
        ],
        explicacionGeneral:
          'Los principales factores de riesgo para aneurisma intracraneal son: antecedente familiar de aneurisma (especialmente dos o más familiares de primer grado), tabaquismo, hipertensión arterial, sexo femenino (mayor prevalencia), poliquistosis renal autosómica dominante y algunos síndromes del tejido conectivo (Ehlers-Danlos tipo IV, Marfan).',
        conceptoClave: {
          pregunta: '¿Cuáles son los principales factores de riesgo para el aneurisma intracraneal?',
          respuesta:
            'Antecedente familiar de aneurisma cerebral, tabaquismo, hipertensión arterial, sexo femenino, poliquistosis renal autosómica dominante y síndromes del tejido conectivo como Ehlers-Danlos tipo IV. La presencia de dos o más factores aumenta significativamente el riesgo.',
        },
      },
    ],
    conceptosClave: [
      {
        pregunta: '¿Cuáles son los signos meníngeos y qué indican?',
        respuesta:
          'Rigidez de nuca: resistencia a la flexión cervical pasiva. Kernig: dolor e imposibilidad de extender la rodilla con cadera flexionada a 90°. Brudzinski: flexión involuntaria de rodillas al flexionar el cuello. Sugieren irritación meníngea (meningitis, HSA).',
        asignatura: 'Neurología',
        tema: 'Semiología Neurológica',
      },
      {
        pregunta: '¿Qué es la xantocromía del LCR y cuándo aparece?',
        respuesta:
          'Coloración amarillenta del líquido cefalorraquídeo producida por la degradación de la hemoglobina (oxihemoglobina → bilirrubina). Aparece entre las 2-4 horas tras el sangrado y persiste hasta 2-4 semanas. Es el marcador más sensible de HSA cuando la TC es negativa.',
        asignatura: 'Neurología',
        tema: 'Cefaleas y Emergencias Neurológicas',
      },
    ],
    advertenciaEducativa:
      'Este caso clínico es ficticio y tiene fines exclusivamente educativos para estudiantes de Medicina. No constituye diagnóstico ni recomendación terapéutica. Toda decisión clínica real debe realizarse bajo supervisión médica.',
  },

  // ─── CASO 3 ─────────────────────────────────────────────────────────────────
  {
    id: 'caso-003',
    titulo: 'Poliuria y polidipsia en adolescente',
    asignatura: 'Endocrinología',
    tema: 'Diabetes Mellitus',
    dificultad: 'básico',
    descripcion:
      'Un adolescente de 16 años consulta por aumento del volumen urinario y sed excesiva de dos semanas de evolución. Caso para aprender el enfoque diagnóstico de la hiperglucemia.',
    paciente: {
      edad: 16,
      sexo: 'masculino',
      motivoConsulta:
        'Poliuria (orina más de 10 veces al día, incluida la noche), polidipsia intensa, pérdida de peso de 4 kg en dos semanas sin dieta. Refiere cansancio y visión borrosa ocasional.',
      antecedentes:
        'Sin antecedentes patológicos previos. Madre con diabetes tipo 1. No toma medicamentos. No hospitalizado antes.',
      examenFisico:
        'Peso: 58 kg, Talla: 1,72 m (IMC: 19,6 kg/m²). FC: 94 lpm, PA: 110/70 mmHg, T°: 36,8 °C. Mucosas semisecas. Aliento con leve olor afrutado. Sin acantosis nigricans. Sin hepatomegalia.',
      examenes:
        'Glucemia capilar en urgencias: 385 mg/dL. Orina: glucosuria +++, cetonuria ++. pH venoso: 7,28.',
    },
    preguntas: [
      {
        id: 'p-003-1',
        enunciado:
          '¿Cuál es el diagnóstico más probable en este paciente?',
        opciones: [
          {
            id: 'o-7a',
            texto: 'Diabetes mellitus tipo 2',
            esCorrecta: false,
            explicacion:
              'Incorrecto. La DM tipo 2 es más frecuente en adultos con sobrepeso y resistencia a la insulina. Este paciente es delgado, joven, con antecedente familiar de DM tipo 1 y presenta cetoacidosis, lo que orienta fuertemente a DM tipo 1.',
          },
          {
            id: 'o-7b',
            texto: 'Diabetes mellitus tipo 1 en debut',
            esCorrecta: true,
            explicacion:
              'Correcto. La tríada clásica de debut de DM tipo 1 incluye poliuria, polidipsia y pérdida de peso en un paciente joven y delgado, con hiperglucemia marcada y cetonemia/cetonuria. El pH de 7,28 indica cetoacidosis diabética en curso. El antecedente familiar de DM tipo 1 apoya el diagnóstico.',
          },
          {
            id: 'o-7c',
            texto: 'Diabetes insípida central',
            esCorrecta: false,
            explicacion:
              'Incorrecto. La diabetes insípida produce poliuria y polidipsia por déficit de ADH, pero la orina es hipotónica (densidad baja), no hay hiperglucemia ni glucosuria. La glucemia capilar de 385 mg/dL descarta este diagnóstico.',
          },
          {
            id: 'o-7d',
            texto: 'Síndrome nefrótico',
            esCorrecta: false,
            explicacion:
              'Incorrecto. El síndrome nefrótico produce edemas, proteinuria masiva e hipoalbuminemia. No causa la tríada de poliuria-polidipsia-pérdida de peso con hiperglucemia y cetonuria de este caso.',
          },
        ],
        explicacionGeneral:
          'La diabetes mellitus tipo 1 es una enfermedad autoinmune con destrucción de células β pancreáticas que produce insulinopenia absoluta. Debuta frecuentemente en la infancia o adolescencia con la tríada clásica: poliuria, polidipsia y pérdida de peso. La hiperglucemia severa con cetonuria indica cetoacidosis diabética, la complicación aguda más frecuente del debut de DM tipo 1.',
        conceptoClave: {
          pregunta: '¿Cuál es la tríada clásica de debut de la diabetes mellitus tipo 1?',
          respuesta:
            'Poliuria (diuresis osmótica por glucosuria), polidipsia (por hiperosmolaridad plasmática) y pérdida de peso (por catabolismo proteico y lipólisis ante la ausencia de insulina). Frecuentemente acompañada de cansancio y visión borrosa.',
        },
      },
      {
        id: 'p-003-2',
        enunciado:
          '¿Qué hallazgo del laboratorio confirma la presencia de cetoacidosis diabética (CAD)?',
        opciones: [
          {
            id: 'o-8a',
            texto: 'Glucemia capilar mayor de 200 mg/dL',
            esCorrecta: false,
            explicacion:
              'Incorrecto. La hiperglucemia es necesaria para el diagnóstico de CAD, pero no suficiente por sí sola. Existen casos de CAD euglucémica (glucemia <200 mg/dL), especialmente con uso de inhibidores de SGLT-2.',
          },
          {
            id: 'o-8b',
            texto: 'Cetonuria en la tira reactiva de orina',
            esCorrecta: false,
            explicacion:
              'Incorrecto. La cetonuria apoya el diagnóstico de CAD pero no es suficiente para confirmarlo, ya que puede haber cetonuria en ayuno prolongado o dieta cetogénica sin acidosis. Se requiere además acidosis metabólica.',
          },
          {
            id: 'o-8c',
            texto: 'pH venoso < 7,30 con cetonemia y bicarbonato bajo',
            esCorrecta: true,
            explicacion:
              'Correcto. El diagnóstico de CAD requiere la tríada: hiperglucemia (generalmente >250 mg/dL), acidosis metabólica (pH <7,30 o bicarbonato <15 mEq/L) y cetonemia o cetonuria significativa. En este caso el pH de 7,28 con cetonuria ++ confirma la CAD.',
          },
          {
            id: 'o-8d',
            texto: 'Hemoglobina glucosilada (HbA1c) mayor del 6,5%',
            esCorrecta: false,
            explicacion:
              'Incorrecto. La HbA1c >6,5% es criterio diagnóstico de diabetes mellitus (control glucémico de los últimos 3 meses), pero no de cetoacidosis diabética. La CAD es una complicación aguda que se diagnostica con los criterios antes mencionados.',
          },
        ],
        explicacionGeneral:
          'La cetoacidosis diabética se define por la tríada: (1) hiperglucemia (>250 mg/dL, aunque puede ser menor), (2) acidosis metabólica con anión gap elevado (pH <7,30, bicarbonato <15 mEq/L) y (3) cetonemia o cetonuria significativa. Resulta de la insulinopenia absoluta o relativa que activa la lipolisis y cetogénesis hepática.',
        conceptoClave: {
          pregunta: '¿Cuáles son los criterios diagnósticos de la cetoacidosis diabética?',
          respuesta:
            'Tríada: (1) Hiperglucemia >250 mg/dL (puede ser menor), (2) Acidosis metabólica con anión gap elevado (pH <7,30 o bicarbonato <15 mEq/L) y (3) Cetonemia o cetonuria significativa. Se clasifica en leve (pH 7,25-7,30), moderada (pH 7,10-7,24) y severa (pH <7,10).',
        },
      },
      {
        id: 'p-003-3',
        enunciado:
          '¿Cuál de los siguientes mecanismos explica la poliuria en la diabetes mellitus descompensada?',
        opciones: [
          {
            id: 'o-9a',
            texto: 'Déficit de hormona antidiurética (ADH)',
            esCorrecta: false,
            explicacion:
              'Incorrecto. La poliuria de la diabetes insípida se debe al déficit de ADH. En la DM la ADH está intacta; la poliuria tiene un mecanismo osmótico diferente.',
          },
          {
            id: 'o-9b',
            texto: 'Diuresis osmótica por glucosuria',
            esCorrecta: true,
            explicacion:
              'Correcto. Cuando la glucemia supera el umbral renal de reabsorción (~180 mg/dL), la glucosa aparece en la orina (glucosuria). La glucosa actúa como soluto osmótico que arrastra agua al túbulo, produciendo diuresis osmótica y poliuria. Esto explica también la deshidratación y la polidipsia compensatoria.',
          },
          {
            id: 'o-9c',
            texto: 'Aumento de la filtración glomerular por hipertensión',
            esCorrecta: false,
            explicacion:
              'Incorrecto. Aunque la hiperglucemia puede aumentar la tasa de filtración glomerular a largo plazo, este no es el mecanismo de la poliuria aguda. El mecanismo central es la diuresis osmótica por glucosuria.',
          },
          {
            id: 'o-9d',
            texto: 'Inhibición de los canales de acuaporina-2',
            esCorrecta: false,
            explicacion:
              'Incorrecto. Los canales de acuaporina-2 son regulados por la ADH en el túbulo colector. Su inhibición produce diabetes insípida nefrogénica, no la poliuria de la diabetes mellitus descompensada.',
          },
        ],
        explicacionGeneral:
          'En la DM, cuando la glucemia supera el umbral de reabsorción tubular renal (aproximadamente 180 mg/dL), la glucosa no reabsorbida permanece en la orina y actúa como soluto osmótico. Esto genera diuresis osmótica: atracción de agua hacia el lumen tubular y aumento del volumen urinario (poliuria). La pérdida de agua genera hiperosmolaridad plasmática, que estimula el centro de la sed (polidipsia).',
        conceptoClave: {
          pregunta: '¿Por qué se produce poliuria en la diabetes mellitus descompensada?',
          respuesta:
            'Por diuresis osmótica: cuando la glucemia supera el umbral renal de reabsorción (~180 mg/dL), la glucosa no reabsorbida actúa como soluto osmótico en el túbulo, arrastrando agua al lumen y aumentando el volumen urinario. La pérdida de agua produce hiperosmolaridad y polidipsia compensatoria.',
        },
      },
    ],
    conceptosClave: [
      {
        pregunta: '¿Cuál es la diferencia fisiopatológica entre DM tipo 1 y DM tipo 2?',
        respuesta:
          'DM tipo 1: destrucción autoinmune de células β pancreáticas → insulinopenia absoluta. Requiere insulina exógena para vivir. DM tipo 2: resistencia periférica a la insulina con disfunción progresiva de células β → insulinopenia relativa. Asociada a obesidad y síndrome metabólico.',
        asignatura: 'Endocrinología',
        tema: 'Diabetes Mellitus',
      },
      {
        pregunta: '¿Qué es el umbral renal de glucosa y qué consecuencia tiene su superación?',
        respuesta:
          'Es la concentración de glucemia (≈180 mg/dL) a partir de la cual los transportadores renales (SGLT) se saturan y no pueden reabsorber toda la glucosa filtrada. La glucosa excedente pasa a la orina (glucosuria), arrastrando agua por osmosis (diuresis osmótica) y produciendo poliuria.',
        asignatura: 'Endocrinología',
        tema: 'Diabetes Mellitus',
      },
    ],
    advertenciaEducativa:
      'Este caso clínico es ficticio con fines exclusivamente educativos. No constituye diagnóstico ni recomendación terapéutica. Las decisiones clínicas reales deben tomarse bajo supervisión médica con base en la evaluación integral del paciente.',
  },
];
